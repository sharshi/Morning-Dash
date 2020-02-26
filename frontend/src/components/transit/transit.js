/*global google*/
import React from 'react';

class Transit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.transitInfo;
  }

  componentDidMount() {
    const { homeAddress, workAddress } = this.props.settings;
    let script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBP6IoBy5dAgF1Y5Tx2c0otAHiDxdPtBlc";
    document.body.appendChild(script);
    script.onload = () => {
      
        this.fetchRoute();
      }
  }

  fetchRoute() {
    var directionsService = new google.maps.DirectionsService();
    const { homeAddress, workAddress } = this.props.settings;
    var origin = homeAddress;
    var destination = workAddress;
    var request = {
      origin,
      destination,
      travelMode: "TRANSIT"
      // transitOptions: {
      //   arrivalTime: Date,
      //   departureTime: Date
      // }
    };
    let res;
    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        res = response.routes[0].legs[0].steps.map((step, idx) => {
          const { travel_mode, duration, transit } = step;
          const departure_time = transit ? transit.departure_time.text : null;
          return {
            travel_mode,
            duration: duration.text,
            departure_time
          };
        });
        const departureTime = response.routes[0].legs[0].departure_time.text;
        this.props.transit({ morning: { departureTime, res } });
      }
    });
  }



  render() {
    debugger
    return (
      <div>
        <ul>
         {this.state ? this.state.transit : null}
        </ul>
      </div>
    )
  }
}

export default Transit;
