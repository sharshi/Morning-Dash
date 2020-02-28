import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.convertTime = this.convertTime.bind(this);
    this.convertIcon = this.convertIcon.bind(this);
  }

  // on mounting fetch the weather from Dark Sky using the logged in user's coordinates
  componentWillMount() {
    this.props.fetchWeather(this.props.coords);
  }

  // convert time of hour blocks to hours based on local time zone.
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

  // convert the icon value found in the Dark Sky API to the value used by peter.build/weather-underground
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
    // add degree symbol
    const degrees = 	"\u00B0"

    /* Extract weather information from weather slice of state (nested under state.weather.data.data). 
     Could not directly extract information in container because it is nested and that caused an error. */
    if (weatherInfo) {
      weatherInfo = weatherInfo.data;
    } else {
      return <div></div>;
    }

    /* conditional to extract every other hourly data from Dark Sky API, up to 24 hours. 
    It's a condition because it causes an error on initial render. */
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
        {/* Current weather logo and tempurature */}
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
        {/* weather scroll for the next 24 hours */}
        <div className="weather-slider">
          <ul className="weather-timeline">
            {hourly.map(hour => {
              // const for converting hour's icon
              const icon = this.convertIcon(hour.icon);
              return (
              <li className="weather-timeblock" key={hour.time}>
                {/* div for time block. All of the lis together show weather change over time. */}
                <div className={`weather-${icon} transparent`}>
                  <img
                    className="weather-block-image"
                    alt={icon}
                    src={
                      `https://peter.build/weather-underground-icons/dist/icons/white/svg/` +
                      icon +
                      `.svg`
                    }
                  />
                </div>
                <div className="weather-time-text">
                  {this.convertTime(hour.time)}
                </div>
                {Math.round(hour.temperature) + degrees}
              </li>
            )})}
          </ul>
        </div>
      </>
    );
  }
}

export default Weather;
