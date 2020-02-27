import { connect } from "react-redux";
import Weather from "./weather";
import { fetchWeather } from "../../actions/weather_actions";

const mapStateToProps = state => {
  return {
    weather: state.entities.weather,
    coords: [state.session.user.homeAddress] // reverse geocode address into lat/long
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWeather: coords => dispatch(fetchWeather(coords))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Weather);
