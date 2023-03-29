const express = require("express");
const serverless = require("serverless-http");

const DB = require("./utils/db");
const Logger = require("./utils/logger");
const webhookFunctions = require("./utils/plaidWebhookFunctions");

const app = express();
app.use(express.json());
const router = express.Router();

router.post("/plaid", async (req, res) => {
  const db = new DB();
  const { body } = req;
  const { webhook_type, webhook_code } = body;
  await Logger.startTransaction("plaid webhook", `${webhook_type}-${webhook_code}`, { env: process.env.EASYLOG_ENV });
  Logger.setContext("Request Body", body);

  const item = await db.getItem(body.item_id);

  if ( item ) {
    const { user } = item.budget;
    Logger.setUser(user.id, user.account.email, user.display_name);

    const func = (webhookFunctions[webhook_type] || {})[webhook_code];

    func({ item, data: body, Logger })
    .then(() => {
      return res.status(200).send("OK")
    })
    .catch(async err => {
      await Logger.captureException(err);
      return res.status(200).send("Internal error")
    })
  } else {
    await Logger.warning("Item does not exist");
    return res.status("200").send("Item does not exist");
  }
});

app.use(`/.netlify/functions/webhooks`, router);

module.exports = app;
module.exports.handler = serverless(app);