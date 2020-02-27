import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.props
  }

  componentWillMount() {
    this.props.fetchWeather(this.props.coords)
  }
  
  render(){
    const { fetchWeather, weather } = this.props;
    let weatherInfo = weather.data;

    if (weatherInfo) {
      weatherInfo = weatherInfo.data
    }
    
    debugger

    return(
      <div>
        <img 
          
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
    )
  }

}

export default Weather;