import * as APIUtil from "../util/weather_util";

export const RECEIVE_WEATHER = "RECEIVE_WEATHER";
export const RECEIVE_WEATHER_ERRORS = "RECEIVE_WEATHER_ERRORS";

export const receiveWeather = weather => {
    return {
        type: RECEIVE_WEATHER,
        weather
    };
};

export const receiveWeatherErrors = errors => {
    return {
        type: RECEIVE_WEATHER_ERRORS,
        errors
    }
}

export const fetchWeather = coords => dispatch => {
    return APIUtil.weather(coords).then(
        weather => dispatch(receiveWeather(weather)),
        errors => dispatch(receiveWeatherErrors(errors))
    )
};