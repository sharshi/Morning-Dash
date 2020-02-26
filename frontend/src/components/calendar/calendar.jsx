// import React from 'react';

// const Config = require("../../apiGoogleconfig.json");

class ApiCalendar extends React.Component {
    constructor(props) {
        super(props);


    }

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
    
 