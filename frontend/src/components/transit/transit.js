/*global google*/
import React from "react";

class Transit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.transitInfo;
  }

  componentDidMount() {
    // grab settings
    const {
      homeAddress,
      workAddress,
      arriveToWorkBy,
      departWorkBy
    } = this.props.settings;

    if (!window.google) {
      let script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBP6IoBy5dAgF1Y5Tx2c0otAHiDxdPtBlc";
      document.body.appendChild(script);
      script.onload = () => {
        this.fetchRoute();
      };
    } else {
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
        let departureTime;
        if (response.routes[0].legs[0].departure_time) {
          departureTime = response.routes[0].legs[0].departure_time.text;
        }
        this.props.transit({ morning: { departureTime, response } });
      }
    });
  }

  render() {
    const { transitInfo } = this.props;
    debugger;
    let result = [];
    if (transitInfo.morning) {
      if (
        transitInfo.morning.response.request.origin.query ===
        transitInfo.morning.response.request.destination.query
      ) {
        return <div></div>;
      }
      if (
        transitInfo.morning.response.routes[0].warnings[0] ===
        "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths."
      ) {
        result.push("Walk to some location");
      } else if (transitInfo.morning.departureTime) {
        result.push(`Leave at ${transitInfo.morning.departureTime} for work`);
      }
    }
    return (
      <div>
        <ul>{result}</ul>
      </div>
    );
  }
}

export default Transit;
