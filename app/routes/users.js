const express = require("express");
const router = express.Router();

const usersLogic = require("../controllers/users");
const validate = require("../validator/validate");
const auth = require("../auth/auth");
const authAdmin = require("../auth/authAdmin");

// fetch
router.get("/fetch", auth, authAdmin, usersLogic.fetch);

// signup
router.post("/signup", validate.signup, usersLogic.signup);

// login
router.post("/login", validate.login, usersLogic.login);

// update profile
router.post("/update", validate.update, auth, usersLogic.update);

// login
router.post("/logout", auth, usersLogic.logout);

module.exports = router;
