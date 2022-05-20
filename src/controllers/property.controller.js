const Property = require('../models/properties.models');

exports.create_property=(req,res)=>{
    const {owner, status, price, state, city, address, type, image_url} = req.body;
    const property = new Property(parseInt(owner.trim()),status.trim(),price.trim(),state.trim(),city.trim(),address.trim(), type.trim(), image_url.trim())
    Property.createProperty(property,(err, data)=>{
        if(err){
            res.status(500).send({
                status: "error",
                error: err.message
            });
            return;
        }
        res.status(201).send({
            status:"success",
            data:data
        });
        return;
    })
}

exports.get_all_properties=(req,res)=>{
    Property.getAllProperties((err, data)=>{
        if(err){
            if(err.kind=="no_properties"){
                res.status(200).send({
                    status:"success",
                    data:data
                });
                return;
            }
            res.status(500).send({
                status: "error",
                error: err.message
            });
            return;
        }
        res.status(200).send({
            status:"success",
            data:data
        });
        return;
    })
};

exports.get_property = (req,res)=>{
    Property.getProperty(req.params.id,(err, data)=>{
        if(err){
            if (err.kind =="not_found"){
                res.status(404).send({status:"error", error:err.kind});
                return;
            }
            res.status(500).send({
                status: "error",
                error: err.message
            });
            return;
        }
        res.status(200).send({
            status:"success",
            data:data
        });
        return;
})
};

exports.find_by_type = (req,res)=>{
    const type = req.query.type;
    Property.findByType(type, (err, data)=>{
        if(err){
            if (err.kind =="not_found"){
                res.status(404).send({status:"error", error:err.kind})
                return;
            }
            res.status(500).send({
                status: "error",
                error: err.message
            });
            return;
        }
        res.status(200).send({
            status:"success",
            data:data
        })
        return;
    })
};

exports.update_property = (req, res)=>{
    // update = req.body;
};

exports.update_status = (req, res)=>{
    const status = "sold";
    newStatus = {status:status, id:req.params.id }
    Property.updateStatus(newStatus, (err, data)=>{
        if(err){
            if (err.kind =="not_found"){
                res.status(404).send({status:"error", error:err.kind})
            }
            res.status(500).send({
                status: "error",
                error: err.message
            });
            return;
        }
        res.status(200).send({
            status:"success",
            data:data
        });
        return;
    })
};

exports.delete_property = (req, res)=>{
    Property.deleteProperty(req.params.id, (err, data)=>{
        if(err){
            res.status(500).send({
                status: "error",
                error: err.message
            });
        }
        {
            res.status(200).send({
                status:"success",
                data:data
            })
        }
    })
};