const fs = require("fs");
const path = require("path");

let imagesLogic = {};

imagesLogic.fetch = async (req, res) => {
    try {
        let filePath = path.resolve(__dirname + "/../images/" + req.params.fileName);
        
        if(fs.existsSync(filePath)) return res.status(200).sendFile(filePath);
        else throw new Error("File does not exist");
    } catch (err) {
        return res.status(500).send({success: false, message: err.message || "Internal server error"});
    }
}

module.exports = imagesLogic;
