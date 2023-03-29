const express = require("express");
const serverless = require("serverless-http");

const DB = require("./utils/db");
const Logger = require("./utils/logger");
const Plaid = require("./utils/plaid");

const db = new DB();

const app = express();
app.use(express.json());
const router = express.Router();

router.get('/plaid-access-token', async(req, res) => {
  await Logger.startTransaction("app function", "GET plaid access token", { env: process.env.EASYLOG_ENV });
  await Logger.setContext("Requery Query", req.query);

  const { userId, publicToken, plaidEnv } = req.query;
  const user = await db.getUser(userId).catch(err => Logger.captureException(err));
  Logger.setUser(user.id, user.email, user.display_name);

  const plaid = new Plaid(plaidEnv);
  const response = await plaid.getAccessToken(publicToken).catch(err => Logger.captureException(err));
  await Logger.info("Get access token request completed", response);

  return res.status(200).send(response);
});

router.delete('/plaid-access-token', async(req, res) => {
  await Logger.startTransaction("app function", "DELETE plaid access token", { env: process.env.EASYLOG_ENV });
  await Logger.setContext("Requery Query", req.query);

  const { userId, accessToken, plaidEnv } = req.query;
  const user = await db.getUser(userId).catch(err => Logger.captureException(err));
  Logger.setUser(user.id, user.email, user.display_name);

  const plaid = new Plaid(plaidEnv);
  const response = await plaid.revokeAccessToken(accessToken).catch(err => Logger.captureException(err));
  await Logger.info("Revoke access token request completed", response);

  return res.status(200).send(response);
});

router.get('/plaid-link-token', async(req, res) => {
  await Logger.startTransaction("app function", "GET plaid link token", { env: process.env.EASYLOG_ENV });
  await Logger.setContext("Request Query", req.query);

  const { userId, plaidEnv, accessToken } = req.query;
  const user = await db.getUser(userId).catch(err => Logger.captureException(err));
  const { host } = req.headers;
  Logger.setUser(user.id, user.email, user.display_name);

  const plaid = new Plaid(plaidEnv);
  const response = await plaid.getLinkToken(
    user.id,
    `https://${host}`, 
    accessToken
  ).catch(err => Logger.captureException(err));
  await Logger.info("Link token request completed", response);

  return res.status(200).send(response);
});

router.post('/sync-plaid-history', async(req, res) => {
  await Logger.startTransaction("app function", "Sync plaid history", { env: process.env.EASYLOG_ENV });
  await Logger.setContext("Requery Body", req.body);

  const { body } = req;
  const { userId, accountId, startDate, endDate } = body;
  const user = await db.getUser(userId).catch(err => Logger.captureException(err));
  Logger.setUser(user.id, user.email, user.display_name);

  const getAccount = `
    query getAccount($account_id: uuid!) {
      account: accounts_by_pk(id: $account_id) {
        id
        plaid_id
        budget_id
        sync_start_date
        plaid_item {
          id
          env
          access_token
        }
      }
    }
  `;

  const { account } = await db.query(getAccount, { account_id: accountId }).catch(err => {
    Logger.captureException(err);
    return {};
  });
  await Logger.info("Account fetched", account );

  const plaid = new Plaid(account.plaid_item.env);

  const { transactions, accounts: plaidAccounts } = await plaid.getTransactions(account.plaid_item.access_token, startDate, endDate, { account_ids: [ account.plaid_id ] })
    .catch(async err => {
      await Logger.captureException(err);
      return {transactions: [], accounts: []}
    });
  await Logger.info("Transactions Data Fetched", { transactions_count: transactions.length, accounts_count: plaidAccounts.length, start_date: startDate, end_date: endDate });

  const accounts = await db.upsertPlaidAccounts(plaidAccounts, account.budget_id, account.plaid_item.id)
    .catch(async err => {
      await Logger.captureException(err);
      return [];
    });
  await Logger.info("Accounts upserted", { accounts_count: accounts.length });

  await db.upsertPlaidTransactions(transactions, accounts, account.budget_id, startDate)
    .then(transactionsCount => Logger.info("Transactions upserted", { transactions_count: transactionsCount }))
    .catch(err => Logger.captureException(err));

  const updateAccount = `
    mutation UpdateAccount($sync_start_date: String!, $account_id: uuid!) {
      update_accounts_by_pk(
        pk_columns: { id: $account_id },
        _set: { sync_start_date: $sync_start_date }
      ) {
        id
      }
    }
  `;

  await db.query(updateAccount, {
    sync_start_date: startDate < account.sync_start_date ? startDate : account.sync_start_date,
    account_id: accountId
  })
    .then(() => Logger.info("Account field updated", { field: "sync_start_date"}))
    .catch(err => Logger.captureException(err));

  return res.status(200).send("OK");
})

app.use(`/.netlify/functions/functions`, router);

module.exports = app;
module.exports.handler = serverless(app);