const pool = require("../db/db");
const generateShortCode = require("../utils/generateCode");


// POST /api/shorten
const shortenURL = async (req, res) => {

    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({
            message: "Long URL is required"
        });
    }


    const shortCode = generateShortCode();


    await pool.query(
        `INSERT INTO urls (long_url, short_code)
         VALUES ($1, $2)`,
        [longUrl, shortCode]
    );


    res.status(201).json({
        message: "URL Shortened Successfully",
        shortCode
    });

};



// GET /api/:shortCode
const redirectURL = async (req, res) => {

    const { shortCode } = req.params;


    const result = await pool.query(
        "SELECT long_url FROM urls WHERE short_code = $1",
        [shortCode]
    );


    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }


    // click count increase
    await pool.query(
        "UPDATE urls SET clicks = clicks + 1 WHERE short_code = $1",
        [shortCode]
    );


    const longUrl = result.rows[0].long_url;


    res.redirect(longUrl);

};



// GET /api/stats/:shortCode
const getStats = async (req, res) => {

    const { shortCode } = req.params;


    const result = await pool.query(
        "SELECT * FROM urls WHERE short_code = $1",
        [shortCode]
    );


    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "URL not found"
        });
    }


    res.json(result.rows[0]);

};



module.exports = {
    shortenURL,
    redirectURL,
    getStats
};