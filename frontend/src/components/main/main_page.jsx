import React from "react";
import { Link } from "react-router-dom";
import Transit from "../transit/transit_container";
import Modal, { ModalContext } from "../modal/modal";
import EditFormContainer from "../session/edit_form_container";
import { Fragment } from "react";
import CalendarContainer from "../calendar/calendar_container";
import WeatherContainer from "../weather/weather_container";
import SummaryContainer from "../summary/summary_container";

function ToggleModalButton() {
  return (
    <ModalContext.Consumer>
      {({ isOpen }) => (
        <Modal.ToggleButton
          className={isOpen ? "change" : "settings-button-container"}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </Modal.ToggleButton>
      )}
    </ModalContext.Consumer>
  );
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggedIn, user } = this.props;
    return (
      <div className="main-page-container">
        <div className="main-page-nav-bar">
          <Link to={`/`}>Morning Dash</Link>
          {loggedIn ? (
            <Modal>
              <Modal.Content>
                <EditFormContainer />
              </Modal.Content>
              <ToggleModalButton />
            </Modal>
          ) : (
            <Link className="link-to-button-styling" to={"/login"}>
              Login
            </Link>
          )}
        </div>
        <div className="main-page-glance">
          {loggedIn ? (
            <h1 className="welcome-message">Welcome {user.handle}</h1>
          ) : (
            <h1 className="welcome-message">Welcome Demo User!</h1>
          )}

          {loggedIn ? null : (
            <Link
              className="link-to-button-styling main-signup-button"
              to={`/signup`}
            >
              Sign Up
            </Link>
          )}

          {loggedIn ? (
            <SummaryContainer />
          ) : (
            <Fragment>
              <div className="glance-summary">
                <div className="glance-summary-item">
                  Mostly sunny. No rain today.
                </div>
                <div className="glance-summary-item">
                  Leave at 8:22 AM for work.
                </div>
                <div className="glance-summary-item"> 3 events today.</div>
              </div>
            </Fragment>
          )}
        </div>
        {loggedIn ? (
          <WeatherContainer />
        ) : (
          <Fragment>
            <img
              className="weather-logo"
              src="https://peter.build/weather-underground-icons/dist/icons/white/svg/mostlysunny.svg"
            />
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
                  <div className="weather-rain"></div>
                  <div className="weather-time-text">11am</div>
                </li>
                <li className="weather-timeblock">
                  <div className="weather-rain"></div>
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
          </Fragment>
        )}

        <div className="commute-summary">
          <div className="commute-summary-item">
            {loggedIn ? <Transit /> : "Leave at 8:22 AM for work."}
          </div>

          <div className="commute-summary-item">commute summary item</div>
        </div>
        {loggedIn ? (
          <CalendarContainer className="link-to-button-styling" />
        ) : (
          <div className="calendar-events-summary">
            <ul className="calendar-event-items">
              <li>9:00 AM - Check in</li>
              <li>1:30 PM - Check in</li>
              <li>5:00 PM - Check in</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default MainPage;
