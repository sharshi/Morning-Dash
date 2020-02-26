import { connect } from "react-redux";

import Calendar from './calendar'
import { receiveEvents } from "../../actions/events_actions";


const mapStateToProps = state => ({
  events: state.entities.events
});

const mapDispatchToProps = dispatch => {
  debugger
  return { receiveEvents: (events) => dispatch(receiveEvents(events)) }
};




export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
