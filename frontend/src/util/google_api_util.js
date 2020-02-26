const Config = require("./apiGoogleconfig.json");
const onLoadCallback = null;
let sign = false;

const updateSigninStatus = (isSignedIn) => {
    sign = isSignedIn;
  }

export const initClient = () => {
window.gapi.client
    .init(Config)
    .then(function() {
    window.gapi.auth2
        .getAuthInstance()
        .isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(
        window.gapi.auth2.getAuthInstance().isSignedIn.get()
    )
    if (window.gapi) {
        //  
    //   listUpcomingEvents();
    }
    })
    .catch(function(e) {
        console.log(e);
    });
}

export const handleClientLoad = () => {
 
const script = document.createElement("script");
script.src = "https://apis.google.com/js/api.js";
document.body.appendChild(script);
script.onload = function() {
    window["gapi"].load("client:auth2", initClient);
    };
}

export const listUpcomingEvents = () => {
     
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
    }

// const listenSign = (callback) => {
//     if (this.gapi) {
//         this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
//     } else {
//         console.log("Error: this.gapi not loaded");
//     }
// }

// const onLoad = (callback) => {
//     if (this.gapi) {
//         callback();
//     } else {
//         this.onLoadCallback = callback;
//     }
// }

 