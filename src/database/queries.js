require('dotenv/config');
const { DB_NAME } = process.env;


const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableProperties = `
CREATE TABLE IF NOT EXISTS properties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner INT NOT NULL,
    FOREIGN KEY(owner) REFERENCES users(id),
    status VARCHAR(50) NOT NULL DEFAULT 'available',
    price FLOAT(9,2) NOT NULL ,
    state VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    image_url VARCHAR(1000) NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createNewProperty = `
INSERT INTO properties VALUES(null, ?, ?, ?, ?, ?, ?. ?, ?, NOW())
`;

const findPropertyByType = `
SELECT * FROM properties WHERE type = ?
`;

const updatePropertyStatus = `UPDATE properties SET status = ? WHERE id = ?`;

module.exports = {
    createDB,
    dropDB,
    createTableProperties,
    createNewProperty,
    findPropertyByType,
    updatePropertyStatus
};