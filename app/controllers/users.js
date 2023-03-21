let usersLogic = {};

const userCollection = require("../models/users");

let service = require("../service/service");
let utils = require("../utils/utils");

// fetch users
usersLogic.fetch = async (req, res) => {
    try {
        // fetch all users
        let users = await service.find(userCollection, {});
    
        return res.status(200).send({success: true, users});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
};

// user signup
usersLogic.signup = async (req, res) => {
    try {
        // check if user already exists
        let obj = {};
        if(req.body.phone) obj.phone = req.body.phone;
        else obj.email = req.body.email;
        let findUser = await service.findOne(userCollection, obj);
        if(findUser) return res.status(400).send({success: false, error: "User already exists"});
        
        let user = userCollection(req.body);
        utils.generateAuthToken(user);

        await service.save(user);
        
        return res.status(200).send({success: true, message: "User created", token: user.token});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
}

// user login
usersLogic.login = async (req, res) => {
    try {
        // check if user exists
        let obj = {};
        if(req.body.phone) obj.phone = req.body.phone;
        else obj.email = req.body.email;
        let findUser = await service.findOne(userCollection, obj);
        if(!findUser) return res.status(400).send({success: false, error: "User does not exist"});
        if(!utils.compare(findUser.password, req.body.password)) return res.status(400).send({success: false, error: "Wrong password"});

        utils.generateAuthToken(findUser);
        await service.save(findUser);
        
        return res.status(200).send({success: true, message: "Logged in", token: findUser.token});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
}

// update user
usersLogic.update = async (req, res) => {
    try {
        // update
        await service.findOneAndUpdate(userCollection, {_id: req.user._id}, {$set: req.body});
        
        return res.status(200).send({success: true, message: "Updated successfully"});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
}

// user logout
usersLogic.logout = async (req, res) => {
    try {
        // find and erase token
        await service.findOneAndUpdate(userCollection, {_id: req.user._id}, {$unset: {token: ""}});

        return res.status(200).send({success: true, message: "Logged out successfully"});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
}

module.exports = usersLogic;
