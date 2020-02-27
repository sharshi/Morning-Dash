import React from "react";
import * as APIUtil from '../../util/google_api_util';

class GoogleLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.buttonRender = this.buttonRender.bind(this);

    this.state = { isSigned: false }
  }

componentDidMount() {
  if (!window.gapi) {
    APIUtil.handleClientLoad();
  }
}


handleAuthClick() {
  if (window.gapi) {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        this.setState({ isSigned: window.gapi.auth2.getAuthInstance().isSignedIn.get() } )
      })
      .catch(function(e) {
        console.log(e);
      });
  } else {
    console.log("Error: window.gapi not loaded");
  }
}

buttonRender() {
  if (window.gapi && this.state.isSigned) {
    return(
      <div>
        singed in successfully
      </div>
    )
  } else {
    return <button onClick={this.handleAuthClick}>sign in to google</button>;
  }
}

  render() {
    return <>{this.buttonRender()}</>;
  }
}

export default GoogleLogin;