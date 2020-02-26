// import React from 'react';

// const Config = require("../../apiGoogleconfig.json");

class ApiCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.calendar = "primary";
        this.handleAuthClick = this.handleAuthClick.bind(this);
        this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
        this.setCalendar = this.setCalendar.bind(this);

    }

//     setCalendar(newCalendar) {
//         this.calendar = newCalendar;
//     }

    

    render() {
        return(
          <>
            <button onClick={this.handleAuthClick}>
              sign in
            </button>
            <button onClick={this.handleSignoutClick}>
              sign out
            </button>
          </>
        )
    }
}

export default ApiCalendar;
    
 