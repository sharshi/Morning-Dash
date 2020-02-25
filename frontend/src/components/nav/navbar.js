import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="main-page-nav-bar">
          <Link to={`/`}>Morning Dash</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="main-page-nav-bar">
          <Link to={`/`}>Morning Dash</Link>
          <Link className="link-to-button-styling" to={"/login"}>
            Login
          </Link>
        </div>
      );
    }
  }

  render() {
    return <nav>{this.getLinks()}</nav>;
  }
}

export default NavBar;
