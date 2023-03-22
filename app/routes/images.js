const express = require("express");
const router = express.Router();

const imagesLogic = require("../controllers/images");

// fetch image
router.get("/:fileName", imagesLogic.fetch);

module.exports = router;
