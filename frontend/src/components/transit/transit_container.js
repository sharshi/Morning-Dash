import { connect } from "react-redux";
import Transit from "./transit";
import { transit } from "../../actions/transit_actions";

const mapStateToProps = (state) => {
  const arriveToWorkTime = new Date();
  const departWorkTime = new Date();
  const arriveAtWork = state.session.user ? state.session.user.arriveToWorkBy : [9, 0] // defaults to 9 AM
  const departWorkAt = state.session.user ? state.session.user.departWorkBy : [17, 0] // defaults to 5 PM
  arriveToWorkTime.setHours(...arriveAtWork)
  departWorkTime.setHours(...departWorkAt)
  return {
    settings: {
      homeAddress: "21456 Holly Oak Dr Cupertino, CA 95014",
      workAddress: "4855 Atherton Ave San Jose, CA 95130",
      arriveToWorkBy: arriveToWorkTime,
      departWorkBy: departWorkTime
    },
    transitInfo: state.entities.transit
  };
};

const mapdispatchToProps = dispatch => {
  return {
    transit: (res) => dispatch(transit(res))
  };
};

export default connect(
  mapStateToProps, 
  mapdispatchToProps
)(Transit);