const plaid = require("plaid");

class Plaid {
  constructor(plaidEnv) {
    this.client = new plaid.Client({
      clientID: process.env.PLAID_CLIENT_ID,
      secret: plaidEnv === "production" ? process.env.PLAID_SECRET_PRODUCTION : process.env.PLAID_SECRET_SANDBOX,
      env: plaid.environments[plaidEnv]
    });
    this.plaidEnv = plaidEnv;
  }

  async getLinkToken(userId, apiUrl, accessToken = null) {
    return this.client.createLinkToken({
      user: { client_user_id: userId },
      client_name: "Finta",
      language: 'en',
      country_codes: ['US', 'CA'],
      products: accessToken ? null : ['transactions'],
      access_token: accessToken,
      webhook: `${apiUrl}/.netlify/functions/webhooks/plaid`
    })
  };

  async getAccessToken(publicToken) {
    return this.client.exchangePublicToken(publicToken);
  }

  async revokeAccessToken(accessToken){
    return this.client.removeItem(accessToken);
  }

  async getAccounts(accessToken){
    return this.client.getAccounts(accessToken).catch(err => console.log(err));
  };

  async getTransactions(accessToken, startDate, endDate, options) {

    const response = await this.client
    .getTransactions(accessToken, startDate, endDate, { ...options, count: 500 });

    let transactions = response.transactions;
    const { accounts, total_transactions } = response;

    while ( transactions.length < total_transactions ) {
      const paginatedTransactionsResponse = await this.client
      .getTransactions(accessToken, startDate, endDate, {
        ...options,
        count: 500,
        offset: transactions.length
      });

      transactions = transactions.concat(paginatedTransactionsResponse.transactions);
    }

    return { transactions, accounts }
  }
}

module.exports = Plaid;