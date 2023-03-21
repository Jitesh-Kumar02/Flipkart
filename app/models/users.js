const MONGOOSE = require("mongoose");

const { users } = require("../CONSTANTS/CONSTANTS");

const UsersSchema = new MONGOOSE.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    password: { type: String, required: true },
    userType: { type: Number, enum: Object.values(users), default: users.CUSTOMER },
    token: { type: String },
}, { versionKey: false });

module.exports = new MONGOOSE.model("user", UsersSchema);
