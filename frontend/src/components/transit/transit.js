/*global google*/
import React from "react";

class Transit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const { homeAddress, workAddress } = this.props.settings;
    this.fetchRoute(homeAddress, workAddress, directionsService, "morning");
    this.fetchRoute(workAddress, homeAddress, directionsService, "afternoon");
  }

  fetchRoute(origin, destination, directionsService, timeofday) {
    var request = {
      origin,
      destination,
      travelMode: "TRANSIT"
    };
    const { arriveToWorkBy, departWorkBy } = this.props.settings;

    if (timeofday === "morning") {
      request.transitOptions = {
        arrivalTime: arriveToWorkBy
      };
    } else {
      request.transitOptions = {
        departureTime: departWorkBy
      };
    }

    let res;
    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        res = response.routes[0].legs[0].steps.map((step, idx) => {
          const { travel_mode, duration, transit } = step;
          const departure_time = transit
            ? transit.departure_time.text
            : "whenever you want";
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
        this.props.transit({ departureTime, response, timeofday })
        this.setState(this.props.transitInfo);
      }
    });
  }

  render() {
    
    const { transitInfo } = this.props;

    const transitSummary = Object.keys(transitInfo).map(key => {
      const route = transitInfo[key].response.routes[0].legs[0];

      const distance = route.distance.text;
      const departure_time = route.departure_time.text;
      const arrival_time = route.arrival_time.text;
      const duration = route.duration.text;

      const steps = route.steps.map(step => {
        if (step.travel_mode === "WALKING") {
          
          return (
            <li key={step.instructions}>
              <p>
                {step.instructions} ({step.duration.text})
              </p>
            </li>
          );
        } else {
          
          return (
            <li key={step.transit.headsign}>
              <p>
                <img
                  src={
                    step.transit.line.icon
                      ? step.transit.line.icon
                      : step.transit.line.vehicle.icon
                  }
                />
                {step.transit.line.vehicle.name === "Bus"
                  ? step.transit.line.short_name
                  : null}{" "}
                {step.transit.line.vehicle.name} towards {step.transit.headsign}{" "}
                to {step.transit.arrival_stop.name} ({step.duration.text}).
              </p>
            </li>
          );
        }
      });

      return (
        <li key={arrival_time}>
          distance: {distance} departure_time: {departure_time} arrival_time:{" "}
          {arrival_time} duration: {duration}
          <ul>{steps}</ul>
        </li>
      );
    });
    return (
      <div className="transit-container">
        <ul>{transitSummary}</ul>
      </div>
    );
  }
}

export default Transit;
