const mysql = require('mysql');
const { logger } = require('../utils/logger');
require('dotenv/config');
const { DB_HOST, DB_USER, DB_PASS } = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS
});

connection.connect((err) => {
    if (err) logger.error(err.message);
});

module.exports = connection;