let validate = {};
const Joi = require('joi');

const { discountType } = require("../CONSTANTS/CONSTANTS");

const signup = Joi.object({
    email: Joi.string().email(),
    authType: Joi.number().valid(1, 2),
    phone: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).when("email", { is: Joi.exist(), then: Joi.forbidden(), otherwise: Joi.required() }),
    password: Joi.string().regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")).message("Enter a valid password").required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});

const login = Joi.object({
    email: Joi.string().email(),
    phone: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).when("email", { is: Joi.exist(), then: Joi.forbidden(), otherwise: Joi.required() }),
    password: Joi.string().regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")).message("Enter a valid password").required(),
});

const update = Joi.object({
    name: Joi.string(),
});

const fetchOneProduct = Joi.object({
    productID: Joi.string().required(),
    vendorID: Joi.string().required(),
});

const fetchProducts = Joi.object({
    vendorID: Joi.string().required(),
    page: Joi.number().required(),
    limit: Joi.number().required(),
});

const addNewProduct = Joi.object({
    vendorID: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    discount: Joi.number(),
    discountType: Joi.number().valid(...Object.values(discountType)),
});

const addToCart = Joi.object({
    productID: Joi.string().required(),
    quantity: Joi.number().required(),
});

const fetchOrders = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required(),
});

const rating = Joi.object({
    rating: Joi.number().required().min(0).max(5),
    productID: Joi.string().required(),
    vendorID: Joi.string().required(),
});

const removeRating = Joi.object({
    productID: Joi.string().required(),
    vendorID: Joi.string().required(),
});

const validateAll = (req, res, next, schema, payload) => {
    try {
        const result = schema.validate(payload);
        if(result.error) {
            return res.status(400).send({success: false, error: result.error.message || "Invalid data"});
        } else {
            req.body = result.value;
        }
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "internal server error"});
    }
    next();
}

validate.signup = (req, res, next) => {
    validateAll(req, res, next, signup, req.body);
}

validate.login = (req, res, next) => {
    validateAll(req, res, next, login, req.body);
}

validate.fetchOneProduct = (req, res, next) => {
    validateAll(req, res, next, fetchOneProduct, req.query);
}

validate.fetchProducts = (req, res, next) => {
    validateAll(req, res, next, fetchProducts, req.query);
}

validate.addNewProduct = (req, res, next) => {
    req.body.price = parseInt(req.body.price);
    if(isNaN(req.body.price)) return res.status(400).send({success: false, message: "Invalid price"});
    validateAll(req, res, next, addNewProduct, req.body);
}

validate.addToCart = (req, res, next) => {
    validateAll(req, res, next, addToCart, req.body);
}

validate.fetchOrders = (req, res, next) => {
    validateAll(req, res, next, fetchOrders, req.query);
}

validate.rating = (req, res, next) => {
    validateAll(req, res, next, rating, req.body);
}

validate.removeRating = (req, res, next) => {
    validateAll(req, res, next, removeRating, req.body);
}

validate.update = (req, res, next) => {
    validateAll(req, res, next, update, req.body);
}

module.exports = validate;
