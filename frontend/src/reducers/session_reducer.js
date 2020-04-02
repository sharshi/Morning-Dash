import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN
} from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: {
    _id: '5e68fd2a70173272a1ee9946',
    handle: 'Demo User',
    email: 'demouser@gmail.com',
    homeAddress: '285 Douglass St, Brooklyn, NY 11217, USA',
    workAddress: '90 5th',
    arriveToWorkBy: [
      9,
      0
    ],
    departWorkBy: [
      17,
      0
    ],
    coords: [
      40.70108,
      -73.906666
    ],
    iat: 1583939509,
    exp: 1583943109
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      
      return {
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: initialState.user
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      };
    default:
      return state;
  }
}
