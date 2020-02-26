import React from 'react';
import * as APIUtil from "../../util/google_api_util";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.initClient = this.initClient.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
    this.state = { sign: false };
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  componentDidMount() {
    this.handleClientLoad();
  }

  updateSigninStatus = isSignedIn => {
    this.setState({ sign: isSignedIn });
  };

  initClient() {
    debugger
    window.gapi.client
      .init({
        clientId:
          "913796629534-repc8rtrbnar1d501c04shjak729kkqi.apps.googleusercontent.com",
        apiKey: "AIzaSyBO2smycDeswTAfQXAtU3NyF4DqfjPfktY",
        scope: "https://www.googleapis.com/auth/calendar.events.readonly",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        ]
      })
      .then(() => {
        debugger
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(this.updateSigninStatus);
        this.updateSigninStatus(
          window.gapi.auth2.getAuthInstance().isSignedIn.get()
        );

        if (this.state.sign) {
          this.listUpcomingEvents();
        }
      })
      .catch(function(e) {
        debugger
        console.log(e);
      });
  }

  handleClientLoad() {
    debugger
    if (!window.gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      document.body.appendChild(script);
      script.onload = () => {
        window["gapi"].load("client:auth2", this.initClient);
      };
    } else {
      window["gapi"].load("client:auth2", this.initClient);
    }
  }

  listUpcomingEvents = () => {
    debugger
    const maxTime = new Date();
    maxTime.setHours(23, 59, 59);
    return window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        timeMax: maxTime.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime"
      })
      .then(res => {
        debugger
        this.props.receiveEvents(res.result.items);
      });
  };

  handleAuthClick() {
    if (window.gapi) {
      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          console.log("User signed in.");
          this.updateSigninStatus(
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
          );
        })
        .catch(function(e) {
          console.log(e);
        });
    } else {
      console.log("Error: window.gapi not loaded");
    }
  }

  createEvent() {
    debugger
    if (this.props.events.length > 0) {
      return this.props.events.map(event => (
        <li>
          <ul>
            <li>
              <p>{event.summary}</p>
            </li>
            <li>
              <a href={event.htmlLink}></a>
            </li>
            <li>
              <p>{event.description}</p>
            </li>
            <li>
              <p>{event.location}</p>
            </li>
            <li>
              <p>{event.start.dateTime}</p>
            </li>
            <li>
              <p>{event.end.dateTime}</p>
            </li>
          </ul>
        </li>
      ));
    } else {
      return "";
    }
  }

  render() {
    debugger
    return (
      <>
        {this.state.sign ? (
          <ul>{this.createEvent()}</ul>
        ) : (
          <button onClick={this.handleAuthClick}>sign in with google</button>
        )}
      </>
    );
  }
}

export default Calendar;
    
 