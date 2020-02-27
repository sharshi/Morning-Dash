import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.props
  }

  componentWillMount() {
    this.props.fetchWeather(this.props.coords);
  }

  render() {
    const { fetchWeather, weather } = this.props;
    let weatherInfo = weather.data;
    let icon;
    if (weatherInfo) {
      weatherInfo = weatherInfo.data;
    } else {
      return <div></div>;
    }

    switch (weatherInfo.currently.icon) {
      case "clear-day":
        icon = "clear";
        break;
      case "clear-night":
        icon = "clear";
        break;
      case "partly-cloudy-day":
        icon = "partlycloudy";
        break;
      case "partly-cloudy-night":
        icon = "partlycloudy";
        break;
      case "cloudy":
        icon = "cloudy";
        break;
      case "rain":
        icon = "rain";
        break;
      case "sleet":
        icon = "sleet";
        break;
      case "snow":
        icon = "snow";
        break;
      case "wind":
        icon = "unknown";
        break;
      case "fog":
        icon = "fog";
        break;
      default:
        break;
    }

    return (
      <div>
        <div>{weatherInfo.currently.temperature}</div>
        <img
          src={
            `https://peter.build/weather-underground-icons/dist/icons/white/svg/` +
            icon +
            `.svg`
          }
        />
        <ul>
          <ul>1</ul>
          <ul>2</ul>
          <ul>3</ul>
          <ul>4</ul>
          <ul>5</ul>
          <ul>6</ul>
          <ul>7</ul>
          <ul>8</ul>
          <ul>9</ul>
          <ul>10</ul>
          <ul>11</ul>
          <ul>12</ul>
          <ul>13</ul>
        </ul>
      </div>
    );
  }
}

export default Weather;
