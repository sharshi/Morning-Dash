import { TRANSIT_UPDATE } from "../actions/transit_actions";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRANSIT_UPDATE:
      return Object.assign(state, {}, {
        [action.transitInfo.timeofday]: { 
          departureTime: action.transitInfo.departureTime,
          response: action.transitInfo.response 
        }
      });
    default:
      return state;
  }
}