const express = require("express");

const router = express.Router();


const {
    shortenURL,
    redirectURL,
    getStats
} = require("../controllers/urlController");


// Create short URL
router.post("/shorten", shortenURL);


// Get URL statistics (ye redirect se pehle hona chahiye)
router.get("/stats/:shortCode", getStats);


// Redirect short URL
router.get("/:shortCode", redirectURL);


module.exports = router;