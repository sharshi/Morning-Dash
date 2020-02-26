import React from "react";

class GoogleLogout extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
  }

  handleSignoutClick() {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        auth2.disconnect();
      });
    } else {
      console.log("Error: this.gapi not loaded");
    }
  }

  render() {
    return (
      <>
        <button onClick={this.handleSignoutClick}>sign out</button>
      </>
    );
  }
}

export default GoogleLogout;
