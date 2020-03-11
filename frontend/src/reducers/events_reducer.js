import { RECEIVE_EVENTS, RECEIVE_EVENTS_ERRORS } from '../actions/events_actions';

const initialState = [
  {
  "htmlLink": "#",
  "summary": "Conference Call",
  "start": {
    "dateTime": "2020-03-11T12:00:00-04:00"
  },
  "end": {
    "dateTime": "2020-03-11T13:00:00-04:00"
  }
},
{
    "htmlLink": "#",
    "summary": "Lunch Meeting",
    "start": {
      "dateTime": "2020-03-11T14:30:00-04:00"
    },
    "end": {
      "dateTime": "2020-03-11T15:30:00-04:00"
    }
  },
{
    "htmlLink": "#",
    "summary": "Lecture",
    "start": {
      "dateTime": "2020-03-11T16:00:00-04:00"
    },
    "end": {
      "dateTime": "2020-03-11T17:00:00-04:00"
    }
  }
]

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
