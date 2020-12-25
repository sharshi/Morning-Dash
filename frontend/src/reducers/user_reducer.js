import {
  RECEIVE_CURRENT_USER
} from "../actions/session_actions";

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...action.user
      };
    default:
      return state;
  }
}
