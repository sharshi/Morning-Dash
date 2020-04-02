import {
  RECEIVE_CURRENT_USER
} from "../actions/session_actions";

const initialState = {
  id: "5e68fd2a70173272a1ee9946",
  handle: "Demo User",
  email: "demouser@gmail.com",
  homeAddress: "285 Douglass St, Brooklyn, NY 11217, USA",
  workAddress: "90 5th",
  arriveToWorkBy: [9, 0],
  departWorkBy: [17, 0],
  coords: [40.70108, -73.906666]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...action.user
      };
    default:
      return state;
  }
}
