const MONGOOSE = require("mongoose");

const ReviewSchema = new MONGOOSE.Schema({
    rating: { type: Number, required: true },
    productID: { type: MONGOOSE.ObjectId, required: true },
    customerID: { type: MONGOOSE.ObjectId, required: true },
    vendorID: { type: MONGOOSE.ObjectId, required: true },
}, { versionKey: false });

module.exports = new MONGOOSE.model("review", ReviewSchema);
