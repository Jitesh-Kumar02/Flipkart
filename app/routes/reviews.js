const express = require("express");
const router = express.Router();

const reviewsLogic = require("../controllers/reviews");
const validate = require("../validator/validate");
const auth = require("../auth/auth");

// update ratings
router.post("/rating", validate.rating, auth, reviewsLogic.rating);

// remove ratings
router.post("/removeRating", validate.removeRating, auth, reviewsLogic.removeRating);

module.exports = router;
