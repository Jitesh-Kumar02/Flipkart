const jsonWebToken = require("jsonwebtoken");
let utils = {};

utils.compare = (first, second) => {
    return first == second;
}

utils.generateAuthToken = (payload) => {
    try {
        payload.token = jsonWebToken.sign({ _id: payload._id}, process.env.SECRET_KEY);
        return;
    } catch(err) {
        console.log(err);
    }
}

module.exports = utils;
