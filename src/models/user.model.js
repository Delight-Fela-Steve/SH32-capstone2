const db = require('../config/db.config');
const { createNewUser, findUserByEmail } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(firstname, lastname, email, phone, address, is_admin, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.is_admin = is_admin;
        this.password = password;
    }

    static create(newUser, cb) {
        db.query(createNewUser, 
            [
                newUser.firstname, 
                newUser.lastname, 
                newUser.email,
                newUser.phone,
                newUser.address,
                newUser.is_admin, 
                newUser.password
                
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmail, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;