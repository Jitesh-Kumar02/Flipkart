let productsLogic = {};

const service = require("../service/service");

const { users } = require("../CONSTANTS/CONSTANTS");

let productCollection = require("../models/products");
const { default: mongoose } = require("mongoose");

// fetch one product
productsLogic.fetchOneProduct = async (req, res) => {
    try {
        // fetch one product
        let product = await service.findOne(productCollection, {_id: new mongoose.Types.ObjectId(req.body.productID), vendorID: new mongoose.Types.ObjectId(req.body.vendorID)});
        if(!product) return res.status(400).send({success: false, message: "Product does not exist"});
        
        return res.status(200).send({success: true, message: "Product fetched successfully", product});
    } catch(err) {
        return res.status(500).send({success: false, message: err.message || "Internal server error"});
    }
}

// fetch products
productsLogic.fetchProducts = async (req, res) => {
    try {
        // fetch all products of one store/vendor
        let products = await productCollection.aggregate([
            {
                $match: { vendorID: new mongoose.Types.ObjectId(req.body.vendorID) }
            },
            {
                $skip: (req.body.page-1)*(req.body.limit),
            },
            {
                $limit: req.body.limit,
            }
        ])
        
        return res.status(200).send({success: true, message: "Products fetched successfully", products});
    } catch(err) {
        return res.status(500).send({success: false, message: err.message || "Internal server error"});
    }
}

const path = require("path");
const fs = require("fs");
// add product
productsLogic.addNewProduct = async (req, res) => {
    try {
        if(req.user.userType == users.ADMIN && !req.body.vendorID) return res.status(400).send({success: false, message: "Please send vendor id"});
        
        // add new product in one store/vendor
        let product = productCollection(req.body);

        if(req.file) {
            let fileNameArray = req.file.originalname.split('.');
            let fileExtention = fileNameArray[fileNameArray.length - 1];
            let fileName = `${Date.now()}_${fileNameArray.filter(ele => ele != fileExtention).join('_')}.${fileExtention}`;
    
            let writeStream = fs.createWriteStream(path.join(__dirname, "../images/") + fileName);
            
            writeStream.write(req.file.buffer);
            writeStream.on('error', function (err) {
                throw err;
            });
    
            writeStream.end(function (err) {
                if (err) {
                    throw err;
                }
            });
            
            product.image = path.join("http://192.180.0.203:8000", "/images/" , fileName);
        }
        
        if(req.user.userType == users.VENDOR) product.vendorID = req.user._id;
        else if(req.user.userType == users.ADMIN) product.vendorID = new mongoose.Types.ObjectId(req.body.vendorID);
    
        await service.save(product);
        
        return res.status(200).send({success: true, message: "Products added successfully"});
    } catch(err) {
        return res.status(500).send({success: false, message: err.message || "Products added successfully"});
    }
}

module.exports = productsLogic;









let pipeline = [
    {
        $lookup: {
            from: "users",
            localField: "vendorID",
            foreignField: "_id",
            as: "vendorDetails"
        }
    }
]
async function func() {
    console.log(await productCollection.aggregate(pipeline));
}
setTimeout(() => {
    // func();
}, 500);