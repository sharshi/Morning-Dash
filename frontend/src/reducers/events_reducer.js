import { RECEIVE_EVENTS, RECEIVE_EVENTS_ERRORS } from '../actions/events_actions';

const eventsReducer = (state = [], action) => {
   
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENTS:
      const newState = action.events.map(event => ({
        htmlLink: event.htmlLink,
        summary: event.summary,
        description: event.description,
        location: event.location,
        start: event.start,
        end: event.end
      }));
      return newState;
    case RECEIVE_EVENTS_ERRORS:
      return { errors: action.errors };
    default:
      return state;
  }
};

export default eventsReducer;
