import { RECEIVE_EVENTS, RECEIVE_EVENTS_ERRORS } from '../actions/events_actions';

const eventsReducer = (state = [], action) => {
  debugger
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.events
    case RECEIVE_EVENTS_ERRORS:
      return { errors: action.errors };
    default:
      return state;
  }
};

export default eventsReducer;
