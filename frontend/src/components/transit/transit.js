/*global google*/
import React from "react";

class Transit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.transitInfo;
  }

  componentDidMount() {

    if (!window.google) {
      let script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBP6IoBy5dAgF1Y5Tx2c0otAHiDxdPtBlc";
      document.body.appendChild(script);
      script.onload = () => {
        this.fetchRoutes();
      };
    } else {
      this.fetchRoutes();
    }
  }

  fetchRoutes() {
    var directionsService = new google.maps.DirectionsService();

    // grab settings
    const {
      homeAddress,
      workAddress
    } = this.props.settings;
    this.fetchRoute(homeAddress, workAddress, directionsService, 'morning');
    this.fetchRoute(workAddress, homeAddress, directionsService, 'afternoon');
  }

  fetchRoute(origin, destination, directionsService, timeofday) {
    var request = {
      origin,
      destination,
      travelMode: "TRANSIT"
    };
    const {
      arriveToWorkBy,
      departWorkBy
    } = this.props.settings;

    if (timeofday === 'morning') {
      request.transitOptions = {
        arrivalTime: arriveToWorkBy
      }
    } else {
      request.transitOptions = {
        departureTime: departWorkBy
      }
    }

    let res; 
    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        debugger
        res = response.routes[0].legs[0].steps.map((step, idx) => {
          const { travel_mode, duration, transit } = step;
          const departure_time = transit ? transit.departure_time.text : 'whenever you want';
          return {
            travel_mode,
            duration: duration.text,
            departure_time
          };
        });
        let departureTime;
        debugger
        if (response.routes[0].legs[0].departure_time) {
          departureTime = response.routes[0].legs[0].departure_time.text;
        }
        this.props.transit({ departureTime, response, timeofday });
      }
    });
  }

  render() {
    const { transitInfo } = this.props;
    let result = [];
    debugger;
    if (transitInfo.morning) {
      debugger
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
    } else if (transitInfo.afternoon) {
      if (
        transitInfo.afternoon.response.request.origin.query ===
        transitInfo.afternoon.response.request.destination.query
      ) {
        return <div></div>;
      }
      if (
        transitInfo.afternoon.response.routes[0].warnings[0] ===
        "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths."
      ) {
        result.push("Walk to some location");
      } else if (transitInfo.afternoon.departureTime) {
        result.push(`Leave at ${transitInfo.afternoon.departureTime} for home`);
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
