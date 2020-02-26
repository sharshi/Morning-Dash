import * as APIUtil from '../util/google_api_util';

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENTS_ERRORS = "RECEIVE_EVENTS_ERRORS";

const receive_events = (events) => ({
    type: RECEIVE_EVENTS,
    events
})



const receiveEventsErrors = errors => {
  return {
    type: RECEIVE_EVENTS_ERRORS,
    errors
  };
};

export const fetchEvents = () => dispatch => {
  return APIUtil.events().then(
    events => dispatch(receive_events(events)),
    errors => dispatch(receiveEventsErrors(errors))
  );
};
