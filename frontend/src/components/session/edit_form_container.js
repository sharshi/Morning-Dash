import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import SignupForm from "./signup_form";

const mapStateToProps = state => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    user: state.session.user || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);