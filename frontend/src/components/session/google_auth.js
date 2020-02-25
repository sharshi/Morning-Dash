import React from "react";
import ApiCalendar from '../calendar/calendar';

const Config = require("../../apiGoogleconfig.json");

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.sign = false;
    this.gapi = null;
    this.onLoadCallback = null;
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.initClient = this.initClient.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.listenSign = this.listenSign.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.handleClientLoad();
  }

  updateSigninStatus(isSignedIn) {
    this.sign = isSignedIn;
  }

  initClient() {
    let _this = this;

    this.gapi = window["gapi"];
    this.gapi.client
      .init(Config)
      .then(function() {
        _this.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(_this.updateSigninStatus);
        _this.updateSigninStatus(
          _this.gapi.auth2.getAuthInstance().isSignedIn.get()
        );
        if (_this.onLoadCallback) {
          _this.onLoadCallback();
        }
      })
      .catch(function(e) {
        console.log(e);
      });
  }

  handleClientLoad() {
    var _this2 = this;

    this.gapi = window["gapi"];
    var script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
    script.onload = function() {
      window["gapi"].load("client:auth2", _this2.initClient);
    };
  }

  handleAuthClick() {
    if (this.gapi) {
      this.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(function() {
          console.log("User signed in.");
        })
        .catch(function(e) {
          console.log(e);
        });
    } else {
      console.log("Error: this.gapi not loaded");
    }
  }

  listenSign(callback) {
    if (this.gapi) {
      this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
    } else {
      console.log("Error: this.gapi not loaded");
    }
  }

  onLoad(callback) {
    if (this.gapi) {
      callback();
    } else {
      this.onLoadCallback = callback;
    }
  }

  handleSignoutClick() {
    debugger
    if (this.gapi) {
      const auth2 = this.gapi.auth2.getAuthInstance();
      auth2
        .signOut()
        .then(function() {
          auth2.disconnect();
        })
        // .then(function() {
        //   console.log("User signed out.");
        // })
        // .catch(function(e) {
        //   console.log(e);
        // });
    } else {
      console.log("Error: this.gapi not loaded");
    }
  }

  render() {
    return (
      <>
        <button onClick={this.handleAuthClick}>sign in</button>
        <button onClick={this.handleSignoutClick}>sign out</button>
      </>
    );
  }
}

export default GoogleAuth;