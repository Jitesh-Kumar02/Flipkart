const express = require("express");
const router = express.Router();

const productsLogic = require("../controllers/products");
const validate = require("../validator/validate");
const authVendor = require("../auth/authVendor");
const auth = require("../auth/auth");
const upload = require("../multer");

// fetch one product
router.get("/fetchOne", validate.fetchOneProduct, productsLogic.fetchOneProduct);

// fetch all products
router.get("/fetch", validate.fetchProducts, productsLogic.fetchProducts);

// add new product
router.post("/add", upload, validate.addNewProduct, auth, authVendor, productsLogic.addNewProduct);

module.exports = router;
