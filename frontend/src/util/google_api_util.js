const Config = require("./apiGoogleconfig.json");
const onLoadCallback = null;
let sign = false;

const updateSigninStatus = (isSignedIn) => {
    sign = isSignedIn;
  }

const initClient = () => {
// let _this = this;
// debugger
// this.gapi = window["gapi"];
window.gapi.client
    .init(Config)
    .then(function() {
    window.gapi.auth2
        .getAuthInstance()
        .isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(
        window.gapi.auth2.getAuthInstance().isSignedIn.get()
    );
    if (onLoadCallback) {
        onLoadCallback();
    }
    })
    .catch(function(e) {
    console.log(e);
    });
}

export const handleClientLoad = () => {
// var _this2 = this;
// this.gapi = window["gapi"];
// debugger
const script = document.createElement("script");
script.src = "https://apis.google.com/js/api.js";
document.body.appendChild(script);
script.onload = function() {
    // debugger
    window["gapi"].load("client:auth2", initClient);
    // debugger
    };
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

 