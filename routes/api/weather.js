const express = require("express");
const app = express();
const router = express.Router();
const keys = require("../../config/keys")
const fetch = require("node-fetch");


/*  Making request to Dark Sky API.
    Using node-fetch dependency to make external call.
    req.body contains latitude at index 0, and longtitude at index 1. */
router.post('/', (req, res) => {
    fetch(`https://api.darksky.net/forecast/${keys.darkSkyAPI}/${req.body[0]},${req.body[1]}`)
    .then(res => res.json())
    .then(data => {
        res.send({ data })
    })
    .catch( err => 
        res.status(404).json({nolocationfound: "Dark Sky could not find the weather at that location"})
    );
});

module.exports = router;