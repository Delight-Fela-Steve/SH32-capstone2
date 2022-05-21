const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const property = (req, res, next) => {
    const schema = Joi.object().keys({
        owner: Joi.number().positive().precision(0).required(),
        status: Joi.string().valid('available', 'sold').required(),
        price: Joi.number().positive().greater(1).precision(2).required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        type:Joi.string().required(),
        image_url:Joi.string().optional()
    });
    validatorHandler(req, res, next, schema);
};

module.exports = { property }