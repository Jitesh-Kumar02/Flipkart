const express = require("express");
const router = express.Router();

const cartLogic = require("../controllers/cart");
const validate = require("../validator/validate");
const auth = require("../auth/auth");

// fetch cart items
router.get("/fetch", auth, cartLogic.fetch);

// add to cart
router.post("/addToCart", validate.addToCart, auth, cartLogic.addToCart);

// checkout
router.post("/checkOut", auth, cartLogic.checkOut);

module.exports = router;
