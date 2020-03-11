import { RECEIVE_EVENTS, RECEIVE_EVENTS_ERRORS } from '../actions/events_actions';

const initialState = [
  {
  "htmlLink": "https://www.google.com/calendar/event?eid=NmljcTZxaWw0NWg1cHZsOWtzMGpiOTl0MDYgcmF6ZWZyb24wMUBt",
  "summary": "Conference Call",
  "start": {
    "dateTime": "2020-03-11T12:00:00-04:00"
  },
  "end": {
    "dateTime": "2020-03-11T13:00:00-04:00"
  }
},
{
    "htmlLink": "https://www.google.com/calendar/event?eid=NjQzb3ZkaWQ1amphNGd0c2xjN2Njc2JwazggcmF6ZWZyb24wMUBt",
    "summary": "Lunch Meeting",
    "start": {
      "dateTime": "2020-03-11T14:30:00-04:00"
    },
    "end": {
      "dateTime": "2020-03-11T15:30:00-04:00"
    }
  },
{
    "htmlLink": "https://www.google.com/calendar/event?eid=NWQ1cjJrZGI5aDJsaG4xM250ZWYwdThlZXQgcmF6ZWZyb24wMUBt",
    "summary": "Lecture",
    "start": {
      "dateTime": "2020-03-11T16:00:00-04:00"
    },
    "end": {
      "dateTime": "2020-03-11T17:00:00-04:00"
    }
  }
]

const eventsReducer = (state = initialState, action) => {
   
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
