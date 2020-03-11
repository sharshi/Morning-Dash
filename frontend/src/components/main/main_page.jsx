import React from "react";
import { Link } from "react-router-dom";
import Transit from "../transit/transit_container";
import Modal, { ModalContext } from "../modal/modal";
import EditFormContainer from "../session/edit_form_container";
import AboutUs from "../about/about_us";
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
            <h1 className="welcome-message">Welcome {user.handle}</h1>

          {loggedIn ? null : (
            <Link
              className="link-to-button-styling main-signup-button"
              to={`/signup`}
            >
              Sign Up
            </Link>
          )}
          <SummaryContainer loggedIn={this.props.loggedIn} />
        </div>
          <WeatherContainer />
          <Transit />
        {loggedIn ? (
          <CalendarContainer className="link-to-button-styling" />
        ) : (
          <div className="calendar-events-summary">
            <ul className="calendar-event-items">
              <h1>Calendar</h1>
              <li>9:00 AM - Check in</li>
              <li>1:30 PM - Check in</li>
              <li>5:00 PM - Check in</li>
            </ul>
          </div>
        )}
        <footer class="footer">
          <div>
            <Modal>
              <Modal.Content>
                <AboutUs />
              </Modal.Content>
              <Modal.OpenButton class="about">About Us</Modal.OpenButton>
            </Modal>
          </div>
          <a href="https://github.com/sharshi/Morning-Dash">
            <i class="devicon-github-plain-wordmark"></i>
          </a>
        </footer>
      </div>
    );
  }
}



export default MainPage;
