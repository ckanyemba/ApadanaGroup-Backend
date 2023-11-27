const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");
const productsRoute = require("./routes/products");
const eventsRoute = require("./routes/events");
const galleriesRoute = require("./routes/galleries");
const users = require("./routes/users");
const orders = require("./routes/orders");
const products = require("./products");
const events = require("./events");
const articlesRoute = require("./routes/articles")
const articles = require("./articles");
const gallery = require("./gallery");
const app = express();

require("dotenv").config();

// Increase the JSON payload size limit
app.use(express.json({ limit: "10mb" })); // You can adjust the limit as needed
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);
app.use("/api/events", eventsRoute);
app.use("/api/galleries", galleriesRoute);
app.use("/api/users", users);
app.use("/api/orders", orders);
app.use("/api/articles", articlesRoute);

app.get("/", (req, res) => {
    res.send("Welcome to our online shop API...");
});

app.get("/products", (req, res) => {
    res.send(products);
});

app.get("/articles", (req, res) => {
  res.send(articles);
});
app.get("/gallery", (req, res) => {
  res.send(gallery);
});

app.get("/events", (req, res) => {
  res.send(events);
});

const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
