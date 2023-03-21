const multer = require("multer");

const upload = multer().single("file");

module.exports = upload;
