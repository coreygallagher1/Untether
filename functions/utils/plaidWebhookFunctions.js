const moment = require("moment-timezone");

const DB = require("./db");
const Plaid = require("./plaid");
const Segment = require("./segment");

const webhookFunctions = {
  ITEM: {
    ERROR: handleItemError,
    PENDING_EXPIRATION: handlePendingExpiration,
    USER_PERMISSION_REVOKED: handleUserPermissionRevoked,
    WEBHOOK_UPDATE_ACKNOWLEDGED: handleWebhookUpdateAcknowledged 
  },
  TRANSACTIONS: {
    DEFAULT_UPDATE: handleDefaultUpdate,
    INITIAL_UPDATE: handleInitialUpdate,
    HISTORICAL_UPDATE: handleHistoricalUpdate,
    TRANSACTIONS_REMOVED: handleTransactionsRemoved
  }
};

async function handleDefaultUpdate({ item, Logger }) {
  const db = new DB();
  const plaid = new Plaid(item.env);
  const startDate = moment().subtract(14, 'days').format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");

  const { transactions, accounts: plaidAccounts } = await plaid.getTransactions(item.access_token, startDate, endDate).catch(async err => {
    await Logger.captureException(err);
    return {transactions: [], accounts: []}
  });
  await Logger.info("Transactions Data Fetched", { transactions_count: transactions.length, accounts_count: plaidAccounts.length, start_date: startDate, end_date: endDate });

  const accounts = await db.upsertPlaidAccounts(plaidAccounts, item.budget.id, item.id).catch(async err => {
    await Logger.captureException(err);
    return [];
  });
  await Logger.info("Accounts upserted", { accounts_count: accounts.length });

  await db.updatePendingTransactions(transactions, item.id)
    .then(pendingTransactionsCount => Logger.info("Pending transactions updated", { transactions_count: pendingTransactionsCount }))
    .catch(err => Logger.captureException(err));

  await db.upsertPlaidTransactions(transactions, accounts, item.budget.id)
    .then(transactionsCount => Logger.info("Transactions upserted", { transactions_count: transactionsCount }))
    .catch(err => Logger.captureException(err));

  await db.deleteOldTransactions(startDate, item.id)
    .then(deletedTransactionsCount => Logger.info("Deleted transactions", { transactions_count: deletedTransactionsCount }))
    .catch(err => Logger.captureException(err));

    const updateItem = `
      mutation UpdateItem($id: String!, $today: timestamptz) {
        update_plaid_items_by_pk(
        pk_columns: { id: $id },
        _set: { synced_at: $today } 
        ) {
          id
        }
      }
    `;

    await db.query(updateItem, { id: item.id, today: new Date().toISOString() })
      .then(() => Logger.info("Item field updated", { field: "synced_at"}))
      .catch(err => Logger.captureException(err))
}

async function handleHistoricalUpdate({ item, Logger }) {
  const db = new DB();

  const updateItem = `
    mutation UpdateItem($id: String!, $today: timestamptz) {
      update_plaid_items_by_pk(
       pk_columns: { id: $id },
       _set: { historical_update_completed_at: $today } 
      ) {
        id
      }
    }
  `;
  await db.query(updateItem, { id: item.id, today: new Date().toISOString() })
    .then(() => Logger.info("Item field updated", { field: "historical_update_completed_at"}))
    .catch(err => Logger.captureException(err));
}

async function handleInitialUpdate({ item, Logger }) {
  const db = new DB();
  const plaid = new Plaid(item.env);

  const startDate = moment().format("YYYY-MM-DD");
  const endDate = startDate;

  const { transactions, accounts: plaidAccounts } = await plaid.getTransactions(item.access_token, startDate, endDate).catch(async err => {
    await Logger.captureException(err);
    return {transactions: [], accounts: []}
  });
  await Logger.info("Transactions Data Fetched", { transactions_count: transactions.length, accounts_count: plaidAccounts.length, start_date: startDate, end_date: endDate });

  const accounts = await db.upsertPlaidAccounts(plaidAccounts, item.budget.id, item.id).catch(async err => {
    await Logger.captureException(err);
    return [];
  });
  await Logger.info("Accounts upserted", { accounts_count: accounts.length });

  await db.upsertPlaidTransactions(transactions, accounts, item.budget.id)
    .then(transactionsCount => Logger.info("Transactions upserted", { transactions_count: transactionsCount }))
    .catch(err => Logger.captureException(err));

  const updateItem = `
    mutation UpdateItem($id: String!, $today: timestamptz) {
      update_plaid_items_by_pk(
       pk_columns: { id: $id },
       _set: { initial_update_completed_at: $today, synced_at: $today } 
      ) {
        id
      }
    } 
  `;
  await db.query(updateItem, { id: item.id, today: new Date().toISOString() })
    .then(() => Logger.info("Item fields updated", { fields: ["initial_update_completed_at", "synced_at"]}))
    .catch(err => Logger.captureException(err));
}

async function handleItemError({ item, data, Logger }) {
  const db = new DB();
  const { error_code } = data.error;

  Segment.track({
    userId: item.budget.user.id,
    event: "Institution Error Triggered",
    properties: {
      provider: "plaid",
      institution: item.name,
      error: error_code
    }
  });
  await Logger.info("Event sent to Segment");

  const updateItem = `
    mutation UpdateItem($id: String!, $error: String!) {
      update_plaid_items_by_pk(
       pk_columns: { id: $id },
       _set: { error: $error } 
      ) {
        id
      }
    }
  `;
  await db.query(updateItem, { id: item.id, error: error_code })
  .then(() => Logger.info("Item field updated", { field: "error" }))
  .catch(err => Logger.captureException(err));
}

async function handlePendingExpiration() {
  return null
};

async function handleTransactionsRemoved({ item, data, Logger }) {
  const db = new DB();
  const { removed_transactions } = data;

  const updateTransactionsMutation = `
    mutation UpdateTransactions($item_id: String!, $transaction_plaid_ids: [String!]!) {
      update_transactions(_set: { is_deleted: true }, where: {plaid_id: {_in: $transaction_plaid_ids}, account: {plaid_item_id: {_eq: $item_id}}} ) {
        affected_rows
      }
    }
  `;

  const response = await db.query(updateTransactionsMutation, {
    item_id: item.id,
    transaction_plaid_ids: removed_transactions
  }).catch(async err => {
    await Logger.captureException(err);
    return {update_transactions: 0}
  });

  await Logger.info("Transactions set to delete", { transaction_count: response.update_transactions.affected_rows })
};

async function handleUserPermissionRevoked({ item, Logger }) {
  const db = new DB();

  Segment.track({
    userId: item.budget.user.id,
    event: "Institution Deleted"
  });
  await Logger.info("Event sent to Segment");

  // Delete Item
  const deleteItem = `
    mutation DeletePlaidItem($id: String!) {
      delete_plaid_items_by_pk (
        id: $id
      ) {
        id
      }
    }
  `;
  await db.query(deleteItem, { id: item.id })
    .then(() => Logger.info("Item deleted"))
    .catch(err => Logger.captureException(err))
}

async function handleWebhookUpdateAcknowledged() {
  return null
}
module.exports = webhookFunctions;