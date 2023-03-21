const MONGOOSE = require("mongoose");

const CartSchema = new MONGOOSE.Schema({
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    productID: { type: MONGOOSE.ObjectId, required: true },
    customerID: { type: MONGOOSE.ObjectId, required: true },
    vendorID: { type: MONGOOSE.ObjectId, required: true },
}, { versionKey: false });

module.exports = new MONGOOSE.model("cart", CartSchema);
