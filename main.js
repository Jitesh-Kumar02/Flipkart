require("dotenv").config();
require("./app/db/conn");

const cors = require("cors");
const express = require("express");
const app = express();
const server = require('http').Server(app);

const cartRoute = require("./app/routes/cart");
const ordersRoute = require("./app/routes/orders");
const productsRoute = require("./app/routes/products");
const usersRoute = require("./app/routes/users");
const reviewsRoute = require("./app/routes/reviews");

app.use(cors());
app.use(express.json());

app.use("/cart", cartRoute);
app.use("/orders", ordersRoute);
app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/reviews", reviewsRoute);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
