import React from "react";
import { withRouter, Link } from "react-router-dom";
import Calendar from "../calendar/calendar_container";
import GoogleLogin from "./google_login";
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      handle: "",
      password: "",
      password2: "",
      homeAddress: "",
      workAddress: "",
      arriveToWorkBy: "",
      departWorkBy: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2,
      homeAddress: this.state.homeAddress,
      workAddress: this.state.workAddress,
      arriveToWorkBy: this.state.arriveToWorkBy,
      departWorkBy: this.state.departWorkBy
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li className="form-error" key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  componentDidMount() {
      if (!window.google) {

        let script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBP6IoBy5dAgF1Y5Tx2c0otAHiDxdPtBlc&libraries=places";
        document.body.appendChild(script);
        script.onload = () => {
          this.handleScriptLoad();
        };
      } else {
        this.handleScriptLoad();
      }

  }

  handleScriptLoad() {
    /* global google */
    
    let inputHome = document.getElementById("autocompleteHome");
    let inputWork = document.getElementById("autocompleteWork");


    let ac = new google.maps.places.Autocomplete(inputHome, {
      types: ["geocode"]
    });

    let ac2 = new google.maps.places.Autocomplete(inputWork, {
      types: ["geocode"]
    });
    google.maps.event.addListener(ac, "home_changed", () => {
      let home = ac.getPlace();
      if (home) {
        this.setState({ homeAddress: home.formatted_address });
      }
    });
    google.maps.event.addListener(ac2, "work_changed", () => {
      let work = ac2.getPlace();
      if (work) {
        this.setState({ workAddress: work.formatted_address });
      }
    });
  }

  render() {
    return (
      <div className="session-form-page">
        <div className="main-page-nav-bar">
          <Link to={`/`}>Morning Dash</Link>
          <Link className="link-to-button-styling" to={"/login"}>
            Login
          </Link>
        </div>
        <div className="signup-form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="session-form">
              <br />
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <br />
              <input
                type="text"
                value={this.state.handle}
                onChange={this.update("handle")}
                placeholder="Handle"
              />
              <br />
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
              <br />
              <input
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                placeholder="Confirm Password"
              />
              <br />
              <input
                type="text"
                value={this.state.homeAddress}
                id="autocompleteHome"
                onChange={this.update("homeAddress")}
                placeholder="Home Address"
              />
              <br />
              <input
                type="text"
                id="autocompleteWork"
                value={this.state.workAddress}
                onChange={this.update("workAddress")}
                placeholder="Work Address"
              />
              <br />
              <div className="time-input-container">
                <input
                  type="time"
                  className="time-input"
                  required
                  value={this.state.arriveToWorkBy}
                  onChange={this.update("arriveToWorkBy")}
                />
                <div className="time-input-label">Time of arrival to work</div>
              </div>
              <div className="time-input-container">
                <input
                  type="time"
                  className="time-input"
                  required
                  value={this.state.departWorkBy}
                  onChange={this.update("departWorkBy")}
                />
                <div className="time-input-label">When to leave work</div>
              </div>
              <br />
              <input
                className="submit-register-form-button"
                type="submit"
                value="Sign up!"
              />
              {this.renderErrors()}
            </div>
          </form>
        </div>

        <GoogleLogin/>
      </div>
    );
  }
}

export default withRouter(SignupForm);
