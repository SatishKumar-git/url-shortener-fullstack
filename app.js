const cors = require("cors");
const express = require("express");
const pool = require("./db/db");
const urlRoutes = require("./routes/urlRoutes");

const app = express();


// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use("/api", urlRoutes);


// Database Connection Test
pool.query("SELECT NOW()")
  .then((res) => {
    console.log("✅ Database Connected");
    console.log(res.rows[0]);
  })
  .catch((err) => {
    console.log(err);
  });


// Home Route
app.get("/", (req, res) => {
    res.send("URL Shortener API is Running 🚀");
});


module.exports = app;