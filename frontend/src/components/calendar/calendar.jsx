import React from 'react';
import * as APIUtil from "../../util/google_api_util";

class Calendar extends React.Component {
    constructor(props) {
      super(props);
      this.sign = false;
      this.updateSigninStatus = this.updateSigninStatus.bind(this);
      this.initClient = this.initClient.bind(this);
      this.handleClientLoad = this.handleClientLoad.bind(this);
      this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
    }

    componentDidMount() {
      debugger
      this.handleClientLoad()
      // if (window.gapi) {
      //   APIUtil.listUpcomingEvents()
      // }
    }

  updateSigninStatus = (isSignedIn) => {
    this.sign = isSignedIn;
  }

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
        debugger
        if (this.sign) {
          debugger
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
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      document.body.appendChild(script);
      script.onload = () => {
        debugger
          window["gapi"].load("client:auth2", this.initClient);
          };
    }

      listUpcomingEvents = () => {
        debugger
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
                debugger
                this.props.receiveEvents(res.result.items)
              })
    }

    render() {
      debugger
        return(
          <>
            <li>

            </li>
          </>
        )
    }
}

export default Calendar;
    
 