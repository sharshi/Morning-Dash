import { RECEIVE_EVENTS, RECEIVE_EVENTS_ERRORS } from '../actions/events_actions';

const weatherReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENTS:
      return { events: action.events };
    case RECEIVE_EVENTS_ERRORS:
      return { errors: action.errors };
    default:
      return state;
  }
};

export default weatherReducer;
