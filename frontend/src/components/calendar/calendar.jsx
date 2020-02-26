import React from 'react';
import * as APIUtil from "../../util/google_api_util";

class Calendar extends React.Component {
    constructor(props) {
      super(props);
      // this.sign = false;
      this.updateSigninStatus = this.updateSigninStatus.bind(this);
      this.initClient = this.initClient.bind(this);
      this.handleClientLoad = this.handleClientLoad.bind(this);
      this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
      this.state = { sign: false }
    }

    componentDidMount() {
      this.handleClientLoad()
    }

  updateSigninStatus = (isSignedIn) => {
     
    this.setState({ sign: isSignedIn })
  }

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
       
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      document.body.appendChild(script);
      script.onload = () => {
         
          window["gapi"].load("client:auth2", this.initClient);
          };
    }

      listUpcomingEvents = () => {
         
        const maxTime = new Date();
        maxTime.setHours(23,59,59);
              return window.gapi.client.calendar.events.list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                timeMax: maxTime.toISOString(),
                showDeleted: false,
                singleEvents: true,
                orderBy: "startTime"
              }).then(res => {
                 
                this.props.receiveEvents(res.result.items)
              })
    }

    createEvent() {
       
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
        return ''
      }
    }

    render() {
       
        return (
          <>
            <ul>{this.createEvent()}</ul>
          </>
        );
    }
}

export default Calendar;
    
 