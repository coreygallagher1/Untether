const axios = require("axios");
const moment = require("moment-timezone");

class DB {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_GQL_ENDPOINT,
      headers: {
        'x-hasura-admin-secret': process.env.NHOST_HASURA_ADMIN_SECRET
      }
    });
  };

  async query(queryString, variables = {}) {
    const response = await this.client.post("/", {
      query: queryString,
      variables
    });

    const { errors, data } = response.data;

    if ( errors ) {
      console.log(response);
      console.log(errors);
    }

    return data;
  }

  async getItem(item_id) {
    const getItemQuery = `
      query GetItem($id: String!) {
        item: plaid_items_by_pk(id: $id) {
          id
          name
          env
          access_token
          budget {
            id
            user {
              id
              display_name
              account {
                email
              }
            }
          }
        }
      }
    `;

    const { item } = await this.query(getItemQuery, { id: item_id });

    return item;
  }

  async getUser(userId) {
    const getUserQuery = `
      query GetUser($id: uuid!) {
        user: users_by_pk(id: $id) {
          id
          display_name
          account {
            email
          }
        }
      }
    `;

    const { user } = await this.query(getUserQuery, { id: userId });
    return { id: user.id, email: user.account.email, display_name: user.display_name}
  }

  async upsertPlaidAccounts(accounts, budgetId, plaidItemId ) {
    const accountObjects = accounts.map(account => ({
      name: account.name,
      type: account.type,
      subtype: account.subtype,
      current_balance: account.balances.current,
      available_balance: account.balances.available,
      currency: account.balances.iso_currency_code,
      budget_id: budgetId,
      plaid_item_id: plaidItemId,
      plaid_id: account.account_id,
      mask: account.mask,
      limit: account.balances.limit,
      sync_start_date: moment().format("YYYY-MM-DD")
    }));

    const upsertAccountsMutation = `
      mutation UpsertAccounts($objects: [accounts_insert_input!]!) {
        insert_accounts(objects: $objects, on_conflict: {
          constraint: accounts_plaid_id_key,
          update_columns: [current_balance, available_balance, limit, currency]
        }) {
          returning {
            id
            plaid_id
            sync_start_date
          }
        }
      }
    `;

    const upsertAccountsResponse = await this.query(upsertAccountsMutation, {
      objects: accountObjects
    }).catch(err => console.log(err));
    
    return upsertAccountsResponse.insert_accounts.returning;
  }

  async updatePendingTransactions(transactions, itemId) {
    const pendingPlaidIds = transactions.filter(transaction => !!transaction.pending_transaction_id).map(transaction => transaction.pending_transaction_id);

    if ( pendingPlaidIds.length === 0 ){
      return 0;
    }

    const getPendingTransactionsQuery = `
      query GetPendingTransactions($item_id: String!, $pending_plaid_ids: [String!]!) {
        pendingTransactions: transactions(where: {account: {plaid_item_id: {_eq: $item_id}}, is_pending: {_eq: true}, plaid_id: { _in: $pending_plaid_ids }}) {
          id
          plaid_id,
          account_id
          amount
          authorized_at
          posted_at
          currency
          notes
          payee_id
          category_id
          amount_converted
        }
      }
    `;

    const { pendingTransactions } = await this.query(getPendingTransactionsQuery, {
      item_id: itemId,
      pending_plaid_ids: pendingPlaidIds
    });

    const transactionObjects = pendingTransactions.map(transaction => {
      const newTransaction = transactions.find(t => t.pending_transaction_id === transaction.plaid_id);
      return {
        ...transaction,
        amount: -newTransaction.amount,
        amount_converted: -newTransaction.amount,
        posted_at: newTransaction.date,
        plaid_id: newTransaction.transaction_id,
        is_deleted: false,
        is_pending: false
      }
    })

    const updatePendingTransactionsMutation = `
      mutation UpdatePendingTransactions($objects: [transactions_insert_input!]!) {
        insert_transactions(objects: $objects, on_conflict: {
          constraint: transactions_pkey,
          update_columns: [ amount, amount_converted, posted_at, plaid_id ]
        }) {
          affected_rows
        }
      }
    `;

    const response = await this.query(updatePendingTransactionsMutation, {
      objects: transactionObjects
    }).catch(e => console.log(e));

    return response.insert_transactions.affected_rows;
  }

  async upsertPlaidTransactions(transactions, accounts, budgetId, overrideStartDate = null ) {
    const transactionObjects = transactions
    .filter(transaction => {
      const account = accounts.find(account => account.plaid_id === transaction.account_id);
      return !!overrideStartDate ? (transaction.authorized_date || transaction.date) >= overrideStartDate : (transaction.authorized_date || transaction.date) >= account.sync_start_date 
    })
    .map(transaction => ({
      account_id: accounts.find(account => account.plaid_id === transaction.account_id).id,
      amount: -transaction.amount,
      authorized_at: transaction.authorized_date || transaction.date,
      posted_at: transaction.pending ? null : transaction.date,
      payee: {
        data: {
          name: transaction.merchant_name || transaction.name,
          budget_id: budgetId
        },
        on_conflict: {
          constraint: "payees_budget_id_name_key",
          update_columns: ["budget_id"]
        }
      },
      currency: transaction.iso_currency_code,
      is_pending: transaction.pending,
      plaid_id: transaction.transaction_id,
      amount_converted: -transaction.amount
    }));

    const upsertTransactionsMutation = `
      mutation UpsertTransactions($objects: [transactions_insert_input!]!) {
        insert_transactions(objects: $objects, on_conflict: {
          constraint: transactions_plaid_id_key,
          update_columns: []
        }) {
          returning {
            id
          }
        }
      }
    `;

    const response = await this.query(upsertTransactionsMutation, {
      objects: transactionObjects
    }).catch(e => console.log(e));

    return response.insert_transactions.returning.length;
  }

  async deleteOldTransactions(startDate, itemId) {
    const deleteTransactionsMutation = `
      mutation DeleteTransactions($start_date: String!, $item_id: String!) {
        delete_transactions(where: { authorized_at: { _lt: $start_date }, account: {plaid_item_id: {_eq: $item_id}}, is_deleted: { _eq: true }}) {
          affected_rows
        }
      }
    `;

    const response = await this.query(deleteTransactionsMutation, {
      item_id: itemId,
      start_date: startDate
    });

    return response.delete_transactions.affected_rows;
  };


};

module.exports = DB;