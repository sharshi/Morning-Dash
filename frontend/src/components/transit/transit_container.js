import { connect } from "react-redux";
import Transit from "./transit";
import { transit } from "../../actions/transit_actions";

const mapStateToProps = state => {
  const arriveToWorkTime = new Date();
  const departWorkTime = new Date();
  const arriveAtWork =
    Object.entries(state.session.user).length !== 0
      ? state.session.user.arriveToWorkBy
      : [9, 0]; // defaults to 9 AM
  const departWorkAt =
    Object.entries(state.session.user).length !== 0
      ? state.session.user.departWorkBy
      : [17, 0]; // defaults to 5 PM

  arriveToWorkTime.setHours(...arriveAtWork);
  departWorkTime.setHours(...departWorkAt);
  return {
    settings: {
      homeAddress: state.session.user.homeAddress
        ? state.session.user.homeAddress
        : "21456 Holly Oak Dr Cupertino, CA 95014",
      workAddress: state.session.user.workAddress
        ? state.session.user.homeAddress
        : "4855 Atherton Ave San Jose, CA 95130",
      arriveToWorkBy: arriveToWorkTime,
      departWorkBy: departWorkTime
    },
    transitInfo: state.entities.transit
  };
};

const mapdispatchToProps = dispatch => {
  return {
    transit: res => dispatch(transit(res))
  };
};

export default connect(mapStateToProps, mapdispatchToProps)(Transit);
