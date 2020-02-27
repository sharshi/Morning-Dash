const express = require("express");
const app = express();
const router = express.Router();
const keys = require("../../config/keys")
const fetch = require("node-fetch");

router.post('/', (req, res) => {
    console.log(req.body);

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