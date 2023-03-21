let ordersLogic = {};

let orderCollection = require("../models/orders");

// fetch orders
ordersLogic.fetch = async (req, res) => {
    try {
        let orders = await orderCollection.aggregate([
            {
                $match: {customerID: req.user._id}
            },
            {
                $group: {_id: "$orderID", price: {$sum: {$multiply: ["$price", "$quantity"]}}, discount: {$sum: {$multiply: ["$discount", "$quantity"]}}}
            },
            {
                $skip: (req.body.page-1)*(req.body.limit)
            },
            {
                $limit: req.body.limit
            }
        ]);

        res.status(200).send({success: true, message: "Fetched successfully", orders});
    } catch(err) {
        res.status(500).send({success: false, message: err.message || "Internal server error"});
    }
};

module.exports = ordersLogic;
