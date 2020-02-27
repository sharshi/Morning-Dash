const express = require("express");
const app = express();
const router = express.Router();
const keys = require("../../config/keys")
const fetch = require("node-fetch");
debugger
router.get('/', (req, res) => {
    console.log(req);
    debugger;
    fetch(`https://api.darksky.net/forecast/${keys.darkSkyAPI}/${40.6875777},${-73.981098}`)
    .then(res => res.json())
    .then(data => {
        res.send({ data })
    })
    .catch( err => 
        res.status(404).json({nolocationfound: "Dark Sky could not find the weather at that location"})
    );
});

module.exports = router;