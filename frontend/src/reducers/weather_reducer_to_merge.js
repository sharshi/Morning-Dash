import { RECEIVE_WEATHER } from "../actions/weather_actions";

weatherReducer = (state ={}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_WEATHER:
           const newState = Object.assign({}, state, { weather: action.weather })
            return newState;
        default:
            return state;
    }
}