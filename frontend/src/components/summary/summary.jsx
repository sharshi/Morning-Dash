import React from "react";


const Summary = ({weather, transit, events }) => {

    if (!weather.data) {
        return null
    }

    if (!transit.morning) {
        return null
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
                    {weather.data.data.daily.summary}
                </li>
                <li className="glance-summary-item">
                    Leave at {transit.morning.departureTime} for work.
                </li>
                <li className="glance-summary-item">
                   {eventsSummary}
                </li>
            </ul>
        </>
    )
}

export default Summary;