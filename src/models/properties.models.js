const db = require('../config/db.config');
const {createNewProperty, findPropertyByType, updatePropertyStatus, getProperties, getProperty:getPropertyQuery,updateProperty:updatePropertyQuery, deleteProperty:deletePropertyQuery} = require('../database/queries');
const { logger } = require('../utils/logger');

class Property {
    constructor(owner, status, price, state, city, address, type, image_url) {
        this.owner = owner;
        this.status = status;
        this.price = price;
        this.state = state;
        this.city = city;
        this.address = address;
        this.type = type;
        this.image_url = image_url;
    }

    static createProperty(newProperty, cb) {
        db.query(createNewProperty, 
            [
                newProperty.owner,
                newProperty.status,
                newProperty.price,
                newProperty.state,
                newProperty.city,
                newProperty.address,
                newProperty.type,
                newProperty.image_url
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    owner:newProperty.owner,
                    status:newProperty.status,
                    price:newProperty.price,
                    state:newProperty.state,
                    vity:newProperty.city,
                    address:newProperty.address,
                    type:newProperty.type,
                    image_url:newProperty.image_url
                });
        });
    }

    static findByType(type, cb) {
        db.query(findPropertyByType, [type], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static updateStatus(newStatus, cb){
        db.query(updatePropertyStatus, [newStatus.status, newStatus.id], (err, res)=>{
            if (err){
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length){
                cb(null, res[0]);
                return;
            }
            cb({kind:"couldn't update"}, null);
        })
    }
    
    static getAllProperties(cb){
        db.query(getProperties, (err, res)=>{
            if (err){
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length){
                cb(null, res);
                return;
            }
            cb({kind:"no_properties"}, res);
        })
    }

    static getProperty(id, cb){
        db.query(getPropertyQuery,[parseInt(id)], (err,res)=>{
            if (err){
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length){
                cb(null, res[0]);
                return;
            }
            cb({kind:"not_found"}, null);
        })
    }

    static updateProperty(update, id, cb){
        db.query(updatePropertyQuery, [...update, parseInt(id)], (err, res)=>{
            if (err){
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length){
                cb(null, res[0]);
                return;
            }
            cb({kind:"not_found"}, null);
        })
    }

    static deleteProperty(id, cb){
        db.query(deletePropertyQuery, [id], (err, res)=>{
            if (err){
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length){
                cb(null, res[0]);
                return;
            }
            cb({kind:"not_found"}, null);
        })
    }
}

module.exports = Property;