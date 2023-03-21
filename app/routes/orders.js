const express = require("express");
const router = express.Router();

const ordersLogic = require("../controllers/orders");
const validate = require("../validator/validate");
const auth = require("../auth/auth");

// fetch orders
router.get("/fetch", validate.fetchOrders, auth, ordersLogic.fetch);

module.exports = router;
