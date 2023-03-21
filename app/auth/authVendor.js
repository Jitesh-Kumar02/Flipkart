const { users } = require("../CONSTANTS/CONSTANTS");

const authVendor = async (req, res, next) => {
    if(req.user.userType == users.VENDOR || req.user.userType == users.ADMIN) next();
    else res.status(401).send({success: false, error: "Authentication failed"});
};

module.exports = authVendor;
