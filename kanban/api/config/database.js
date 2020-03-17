require('dotenv').config();

module.exports = {
    connection: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        options: { useNewUrlParser: true },
    },
}