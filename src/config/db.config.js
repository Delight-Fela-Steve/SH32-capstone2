const mysql = require('mysql');
const { logger } = require('../utils/logger');
require('dotenv/config');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) logger.error(err.message);
    else logger.info('Database connected')
});

module.exports = connection;