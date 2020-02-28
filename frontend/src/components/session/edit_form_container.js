import { connect } from "react-redux";
import { update, logout } from "../../actions/session_actions";
import EditForm from "./edit_form";

const mapStateToProps = state => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    user: state.session.user || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    update: user => dispatch(update(user)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
