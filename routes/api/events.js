const express = require("express");
const app = express();
const router = express.Router();
// const keys = require("../../config/keys");
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  const maxTime = new Date();
    maxTime.setHours(23,59,59);
          return window.gapi.client.calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            timeMax: maxTime.toISOString(),
            showDeleted: false,
            singleEvents: true,
            orderBy: "startTime"
          })
    .then(res => res.result.items.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err =>
      res
        .status(404)
        .json(err)
    );
});

module.exports = router;
