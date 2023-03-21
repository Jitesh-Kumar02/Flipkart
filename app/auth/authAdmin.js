const { users } = require("../CONSTANTS/CONSTANTS");

const authAdmin = async (req, res, next) => {
    if(req.user.authType == users.ADMIN) next();
    else res.status(401).send({success: false, error: "Authentication failed"});
};

module.exports = authAdmin;
