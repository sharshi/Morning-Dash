import React from "react";


const Summary = ({weather, transit, events }) => {

    let eventsSummary;
    
    if (events.length === 0) {
      eventsSummary = "No events today"  
    } else {
        eventsSummary = `${events.length} events today`
    };

    return (
        <div className="summary-container">
            <ul className="summary-list">
                <li className="summary-list-item">
                    {weather.data.data.daily.summary}
                </li>
                <li className="summary-list-item">
                    Leave at {transit.morning.departureTime} for work.
                </li>
                <li className="summary-list-item">
                   {eventsSummary}
                </li>
            </ul>
        </div>
    )
}

export default Summary;