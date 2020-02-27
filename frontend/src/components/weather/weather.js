import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.props

    this.convertTime = this.convertTime.bind(this);
  }

  componentWillMount() {
    this.props.fetchWeather(this.props.coords);
  }

  convertTime(time) {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    debugger

    if (hours === 0) {
      return "12am";
    } else if (hours < 12) {
      return hours + "am";
    } else if (hours === 12) {
      return "12pm"
    } else {
      return (hours - 12) + "pm";
    }
  }

  render() {
    const { weather } = this.props;
    let weatherInfo = weather.data;
    let icon;
    const hourly = [];
    const degrees = 	" \u00B0F"
    
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

    // for (let i = 0; i < weatherInfo.hourly.data.length; i += 2) {
    //   const hour = weatherInfo.hourly.data[i];
    //   hourly.push(hour);
    // }
    let i = 0
    while (hourly.length < 12) {
      const hour = weatherInfo.hourly.data[i];
      hourly.push(hour);

      i += 2;
    }

    debugger
    return (
      <>
        <div>{Math.round(weatherInfo.currently.temperature)}{degrees}</div>
        <img className="weather-logo"
          alt={icon}
          src={
            `https://peter.build/weather-underground-icons/dist/icons/white/svg/` +
            icon +
            `.svg`
          }
        />
        <div className="weather-slider">
        <ul className="weather-timeline">
          {hourly.map( hour => (
            <li className="weather-timeblock" key={hour.time}>
              <div className="weather-raining">.</div>
          <div className="weather-time-text">{this.convertTime(hour.time)}</div>
              {Math.round(hour.temperature)+degrees}
            </li>
          ))}
        </ul>
        </div>
      </>
    );
  }
}

export default Weather;
