import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import MainPage from "./main_page";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(mapStateToProps, { logout })(MainPage);
