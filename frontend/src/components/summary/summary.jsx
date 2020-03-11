import React from "react";


const Summary = ({weather, transit, events, loggedIn }) => {
    let weatherSummary
    if (!weather.data) {
        weatherSummary = null
    } else {
        weatherSummary = weather.data.data.daily.summary
    }

    let transitSummary
    if (!transit.morning) {
        transitSummary = ""
    } else {
        transitSummary = `Leave at ${ transit.morning.departureTime } for work`
    }

    let eventsSummary;
    
    if (events.length === 0) {
      eventsSummary = ""  
    } else if (events.length === 1) {
        eventsSummary = "1 event today"
    } else {
        eventsSummary = `${events.length} events today`
    };

    return (
        <>
            <ul className="glance-summary">
                <li className="glance-summary-item">
                    {weatherSummary}
                </li>
                <li className="glance-summary-item">
                    {transitSummary}
                </li>
                <li className="glance-summary-item">
                    {loggedIn ? eventsSummary : "3 events today"}
                </li>
            </ul>
        </>
    )
}

export default Summary;