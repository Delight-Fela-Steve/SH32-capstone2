const Property = require('../models/properties.models');

exports.createProperty=(req,res)=>{
    const {owner, status, price, state, city, address, type, image_url} = req.body;
    const property = new Property(parseInt(owner.trim()),status.trim(),price.trim(),state.trim(),city.trim(),address.trim(), type.trim(), image_url.trim())
    Property.create(property,(err, data)=>{
        if(err){
            res.status(500).send({
                status: "error",
                error: err.message
            });
        }
        {
            res.status(201).send({
                status:"success",
                data:data
            })
        }
    })
}

exports.getProperties=(req,res)=>{};

exports.getProperty = (req,res)=>{};

exports.getPropertyByType = (req,res)=>{};

exports.updateProperty = (req, res)=>{};

exports.updatePropertyStatus = (req, res)=>{};

exports.deleteProperty = (req, res)=>{};