const Logger = require("@taylorfacen/easylog-js");
const apiToken = process.env.EASYLOG_API_TOKEN;

const logger = new Logger(apiToken);

module.exports = logger;