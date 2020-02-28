import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.convertTime = this.convertTime.bind(this);
    this.convertIcon = this.convertIcon.bind(this);
  }

  componentWillMount() {
    this.props.fetchWeather(this.props.coords);
  }

  convertTime(time) {
    const date = new Date(time * 1000);
    const hours = date.getHours();

    if (hours === 0) {
      return "12am";
    } else if (hours < 12) {
      return hours + "am";
    } else if (hours === 12) {
      return "12pm";
    } else {
      return hours - 12 + "pm";
    }
  }

  convertIcon(oldIcon) {
    let icon;
    switch (oldIcon) {
      case "clear-day":
        icon = "clear";
        return icon;
      case "clear-night":
        icon = "nt_clear";
        return icon;
      case "partly-cloudy-day":
        icon = "partlycloudy";
        return icon;
      case "partly-cloudy-night":
        icon = "nt_partlycloudy";
        return icon;
      case "cloudy":
        icon = "cloudy";
        return icon;
      case "rain":
        icon = "rain";
        return icon;
      case "sleet":
        icon = "sleet";
        return icon;
      case "snow":
        icon = "snow";
        return icon;
      case "wind":
        icon = "unknown";
        return icon;
      case "fog":
        icon = "fog";
        return icon;
      default:
        break;
    }
  }

  render() {
    const { weather } = this.props;
    let weatherInfo = weather.data;

    const hourly = [];
    const degrees = 	"\u00B0"

    if (weatherInfo) {
      weatherInfo = weatherInfo.data;
    } else {
      return <div></div>;
    }
    if (weatherInfo.hourly) {
      
      let i = 0
      while (hourly.length < 12) {
        
        const hour = weatherInfo.hourly.data[i];
        hourly.push(hour);
        
        i += 2;
      }
      
    }

    return (
      <>
        <div className="weather-current">
          <img
            className="weather-logo"
            alt={this.convertIcon(weatherInfo.currently.icon)}
            src={
              `https://peter.build/weather-underground-icons/dist/icons/white/svg/` +
              this.convertIcon(weatherInfo.currently.icon) +
              `.svg`
            }
          />
          <div className="weather-current-temp">
            {Math.round(weatherInfo.currently.temperature)}
            {degrees}
          </div>
        </div>
        <div className="weather-slider">
          <ul className="weather-timeline">
            {hourly.map(hour => (
              <li className="weather-timeblock" key={hour.time}>
                <div className={`weather-${this.convertIcon(hour.icon)} transparent`}>
                  .
                </div>
                <div className="weather-time-text">
                  {this.convertTime(hour.time)}
                </div>
                {Math.round(hour.temperature) + degrees}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default Weather;
