let cartLogic = {};

const { default: mongoose } = require("mongoose");
const { discountType } = require("../CONSTANTS/CONSTANTS");

const cartCollection = require("../models/cart");
const ordersCollection = require("../models/orders");
let productCollection = require("../models/products");

const service = require("../service/service");

// fetch all cart items
cartLogic.fetch = async (req, res) => {
    try {
        // fetch cart items
        let products = await service.find(cartCollection, {customerID: req.user._id});
        if(!products) return res.status(200).send({success: true, message: "Cart is empty"});
        
        return res.status(200).send({success: true, message: "Products fetched successfully", products});
    } catch (err) {
        return res.status(500).send({success: false, message: err.message || "Internal server error"});
    }
}

// add to cart
cartLogic.addToCart = async (req, res) => {
    try {
        // fetch product details
        let product = await service.findOne(productCollection, {_id: req.body.productID});
        // calculate current price, discount
        let price = product.price, discount = 0;
        if(product.discountType == discountType.rs) discount = product.discount;
        else if(product.discountType == discountType.percentage) discount = ((price * product.discount)/100);

        let dataToSet = { price, discount, quantity: req.body.quantity, productID: new mongoose.Types.ObjectId(req.body.productID), customerID: req.user._id, vendorID: product.vendorID };

        // add item to cart (if already present replace it)
        await service.findOneAndUpdate(cartCollection, { productID: new mongoose.Types.ObjectId(req.body.productID), customerID: req.user._id, vendorID: product.vendorID }, {$set: dataToSet});

        return res.status(200).send({success: true, message: "Product added successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).send({success: false, message: err.message || "Internal server error"});
    }
}


cartLogic.checkOut = async (req, res) => {
    try {
        // fetch cart items
        let cart = await service.find(cartCollection, {customerID: req.user._id});
        if(cart.length == 0) return res.status(400).send({success: false, message: "Cart is empty"});
        
        // generate unique id
        let orderID = new mongoose.Types.ObjectId();
        for(let i = 0; i < cart.length; i++) {
            // fetch product details
            let product = await service.findOne(productCollection, {_id: cart[i].productID});
            if(!product) continue;
            // calculate price, discount
            let price = product.price, discount = 0;
            if(product.discountType == discountType.rs) discount = product.discount;
            else if(product.discountType == discountType.percentage) discount = ((price * product.discount)/100);

            // place order
            await service.save(ordersCollection({price, discount, orderID, productID: cart[i].productID, quantity: cart[i].quantity, vendorID: cart[i].vendorID, customerID: req.user._id}));
        }

        // empty cart
        await cartCollection.deleteMany({customerID: req.user._id});

        return res.status(200).send({success: true, message: "Ordered successfully"});
    } catch (err) {
        return res.status(500).send({success: false, message: err.message || "Internal server error"});
    }
}

module.exports = cartLogic;