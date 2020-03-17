require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    development: true,
    logs: process.env.LOGS,
}