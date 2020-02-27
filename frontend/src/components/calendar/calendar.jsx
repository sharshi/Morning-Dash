import React from 'react';
import { Link } from "react-router-dom";

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
        console.log(e);
      });
  }

  handleClientLoad() {
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
    if (this.props.events.length > 0) {
      return this.props.events.map(event => (
        <a key={event.htmlLink} target='_blank' href={event.htmlLink}>{`${event.start.dateTime ? event.start.dateTime.slice(11, 16) : `All Day`} - ${event.summary}`}</a>
      ));
    } else {
      return "";
    }
  }

  render() {
    return (
      <>
        {this.state.sign ? (
          <div className="calendar-events-summary">
            <ul className="calendar-event-items">
              {this.createEvent()}
            </ul>
          </div>
        ) : (
          <button onClick={this.handleAuthClick}>Connect your Google calendar</button>
        )}
      </>
    );
  }
}

export default Calendar;
    
 
