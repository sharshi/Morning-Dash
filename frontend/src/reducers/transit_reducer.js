import { TRANSIT_UPDATE } from "../actions/transit_actions";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRANSIT_UPDATE:
      return action.transitInfo;
    default:
      return state;
  }
}