const express = require("express");
const app = express();
const router = express.Router();
const keys = require("../../config/keys")
const fetch = require("node-fetch");

router.get('/', (req, res) => {
    fetch(`https://api.darksky.net/forecast/${keys.darkSkyAPI}/${40.7362862},${73.9959809}`)
    .then(res => res.json())
    .then(data => {
        res.send({ data })
    })
    .catch( err => 
        res.status(404).json({nolocationfound: "Dark Sky could not find the weather at that location"})
    );
});

module.exports = router;