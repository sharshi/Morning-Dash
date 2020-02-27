import React from "react";
import { withRouter, Link } from "react-router-dom";
import GoogleLogin from "./google_login";
class EditForm extends React.Component {
  constructor(props) {
    super(props);
    
    const [ hoursArrive, minutesArrive ] = this.props.user.arriveToWorkBy;
    const [ hoursDepart, minutesDepart ] = this.props.user.departWorkBy;
    this.state = {
      id: this.props.user.id,
      email: this.props.user.email,
      handle: this.props.user.handle,
      homeAddress: this.props.user.homeAddress,
      workAddress: this.props.user.workAddress,
      coords: this.props.user.coords,
      arriveToWorkBy: `${(hoursArrive + '').padStart(2, '0')}:${(minutesArrive + '').padStart(2, '0')}`,
      departWorkBy: `${(hoursDepart + '').padStart(2, '0')}:${(minutesDepart + '').padStart(2, '0')}`
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.signedIn === true) {
//       this.props.history.push("/login");
//     }

//     this.setState({ errors: nextProps.errors });
//   }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      id: this.state.id,
      email: this.state.email,
      handle: this.state.handle,
      homeAddress: this.state.homeAddress,
      workAddress: this.state.workAddress,
      coords: this.state.coords,
      arriveToWorkBy: this.state.arriveToWorkBy.split(":").map(num => parseInt(num, 10)),
      departWorkBy: this.state.departWorkBy.split(":").map(num => parseInt(num, 10))
    };

    // this.props.update(user); 
  }

  renderErrors() {
    const { errors = {} } = this.props;
    return (
      <ul>
        {Object.keys( errors ).map((error, i) => (
          <li className="form-error" key={`error-${i}`}>
            {errors[error]}
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
    google.maps.event.addListener(ac, "place_changed", () => {
      let home = ac.getPlace();
      
      if (home) {
        const lat = home.geometry.location.lat()
        const lng = home.geometry.location.lng()
        this.setState({ homeAddress: home.formatted_address });
        this.setState({ coords: [lat, lng] });
      }
    });
    google.maps.event.addListener(ac2, "place_changed", () => {
      let work = ac2.getPlace();
      
      if (work) {
        const lat = work.geometry.location.lat()
        const lng = work.geometry.location.lng()
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
                value="Edit!"
              />
              {this.renderErrors()}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditForm);
