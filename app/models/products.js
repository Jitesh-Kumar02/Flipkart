const MONGOOSE = require("mongoose");

const { discountType } = require("../CONSTANTS/CONSTANTS");

const ProductsSchema = new MONGOOSE.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    discountType: { type: Number, enum: Object.values(discountType), default: 1 },
    vendorID: { type: MONGOOSE.ObjectId, required: true },
    image: { type: String }
}, { versionKey: false });

module.exports = new MONGOOSE.model("product", ProductsSchema);
