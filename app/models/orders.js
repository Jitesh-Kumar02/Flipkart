const MONGOOSE = require("mongoose");

const OrdersSchema = new MONGOOSE.Schema({
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    productID: { type: MONGOOSE.ObjectId, required: true },
    customerID: { type: MONGOOSE.ObjectId, required: true },
    vendorID: { type: MONGOOSE.ObjectId, required: true },
    orderID: { type: MONGOOSE.ObjectId, required: true },
}, { versionKey: false });

module.exports = new MONGOOSE.model("orders", OrdersSchema);
