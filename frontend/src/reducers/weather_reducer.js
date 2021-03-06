import {
  RECEIVE_WEATHER,
  RECEIVE_WEATHER_ERRORS
} from "../actions/weather_actions";

const weatherReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_WEATHER:
      return action.weather;
    case RECEIVE_WEATHER_ERRORS:
      return { errors: action.errors };
    default:
      return state;
  }
};

export default weatherReducer;
