import React from "react";

class GoogleLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

// for fetching loggedIn status in session I think we can use - 

// window.gapi.auth2
//         .getAuthInstance()
//         .isSignedIn.G3.value


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

  render() {
    return (
      <>
        <button onClick={this.handleAuthClick}>sign in</button>
      </>
    );
  }
}

export default GoogleLogin;