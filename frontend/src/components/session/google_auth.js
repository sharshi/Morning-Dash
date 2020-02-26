import React from "react";

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }


  handleAuthClick() {
    if (window.gapi) {
      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(function() {
          console.log("User signed in.");
        })
        .catch(function(e) {
          console.log(e);
        });
    } else {
  console.log("Error: window.gapi not loaded");
    }
  }

  handleSignoutClick() {
    debugger
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2
        .signOut()
        .then(function() {
          auth2.disconnect();
        })
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