let reviewsLogic = {};

const { default: mongoose } = require("mongoose");
let ordersCollection = require("../models/orders");
let reviewsCollection = require("../models/reviews");
const service = require("../service/service");

// Update ratings
reviewsLogic.rating = async (req, res) => {
    try {
        // check if user has bought the product earlier
        let order = await service.findOne(ordersCollection, {productID: new mongoose.Types.ObjectId(req.body.productID), customerID: new mongoose.Types.ObjectId(req.user._id), vendorID: new mongoose.Types.ObjectId(req.body.vendorID)});
        if(!order) return res.status(400).send({success: false, message: "You have to buy it to rate it"});
        
        // if yes then update ratings
        await service.findOneAndUpdate(reviewsCollection, {productID: new mongoose.Types.ObjectId(req.body.productID), customerID: new mongoose.Types.ObjectId(req.user._id), vendorID: new mongoose.Types.ObjectId(req.body.vendorID)}, {$set: {rating: req.body.rating}});
        
        return res.status(200).send({success: true, message: "Ratings added"});
    } catch(err) {
        return res.status(500).send({success: false, message: err.message || "Internal server error"});
    }
};

// Remove ratings
reviewsLogic.removeRating = async (req, res) => {
    try {
        // find and remove ratings
        await service.findOneAndDelete(reviewsCollection, {productID: new mongoose.Types.ObjectId(req.body.productID), customerID: new mongoose.Types.ObjectId(req.user._id), vendorID: new mongoose.Types.ObjectId(req.body.vendorID)});
        
        return res.status(200).send({success: true, message: "Ratings deleted"});
    } catch(err) {
        return res.status(500).send({success: false, message: err.message || "Internal server error"});
    }
};

module.exports = reviewsLogic;
