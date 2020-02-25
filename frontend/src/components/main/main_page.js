import React from "react";
import { Link } from "react-router-dom";

class MainPage extends React.Component {
  render() {
    return (
      <div className="main-page-container">
        <div className="main-page-glance">
          <h1 className="welcome-message">Welcome Demo User!</h1>

          <Link
            className="link-to-button-styling main-signup-button"
            to={`/signup`}
          >
            Signup
          </Link>

          <div className="glance-summary">
            <div className="glance-summary-item">
              Mostly sunny. No rain today.
            </div>
            <div className="glance-summary-item">
              Leave at 8:22 AM for work.
            </div>
            <div className="glance-summary-item"> 3 events today.</div>
          </div>

          <img
            className="weather-logo"
            src="https://peter.build/weather-underground-icons/dist/icons/white/svg/mostlysunny.svg"
          />
        </div>
        <div className="api-container">
          <div className="weather-slider">
            <ul className="weather-timeline">
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">Now</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">9am</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-raining"></div>
                <div className="weather-time-text">11am</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-raining"></div>
                <div className="weather-time-text">1pm</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">3pm</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">5pm</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">7pm</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">9pm</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy">x</div>
                <div className="weather-time-text">11pm</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">1am</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">3am</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">5am</div>
              </li>
              <li className="weather-timeblock">
                <div className="weather-cloudy"></div>
                <div className="weather-time-text">7am</div>
              </li>
            </ul>
          </div>
          <div className="commute-summary">
            <div className="commute-summary-item">
              Leave for work at 8:22 AM
            </div>
            {/* <div className="commute-summary-item">Go home at 7:00 PM</div> */}
            <div className="commute-summary-item">
              {/* Movie with Billy at 8:30 PM */}
            </div>
          </div>
          <div className="calendar-events-summary">
            <ul className="calendar-event-items">
              <li>9:00 AM - Check in</li>
              <li>1:30 PM - Check in</li>
              <li>5:00 PM - Check in</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
