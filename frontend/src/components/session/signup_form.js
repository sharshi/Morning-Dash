import React from "react";
import { withRouter, Link } from "react-router-dom";
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
                onChange={this.update("homeAddress")}
                placeholder="Home Address"
              />
              <br />
              <input
                type="text"
                value={this.state.workAddress}
                onChange={this.update("workAddress")}
                placeholder="Work Address"
              />
              <br />
              <input
                type="text"
                value={this.state.arriveToWorkBy}
                onChange={this.update("arriveToWorkBy")}
                placeholder="When do you need to get to work?"
              />
              <br />
              <input
                type="text"
                value={this.state.departWorkBy}
                onChange={this.update("departWorkBy")}
                placeholder="When do you start commuting home?"
              />
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
      </div>
    );
  }
}

export default withRouter(SignupForm);
