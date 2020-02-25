/*global google*/
import React from 'react';

class Transit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
  }

  componentDidMount() {
    var directionsService = new google.maps.DirectionsService();

    const { homeAddress, workAddress } = this.props.settings;
    var origin = homeAddress;
    var destination = workAddress;
    var request = {
      origin,
      destination,
      travelMode: "TRANSIT",
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

          debugger
          return (
            <li key={`${idx}-${travel_mode}`}>
              {travel_mode} {duration.text}
              <br />
              {travel_mode === "TRANSIT" ? (
                  transit.departure_time.text
                ) : null }
            </li>
          );
        });
        this.setState({ test: res });
        console.log(res);
      }
    });
  }

  render() {

    return (
      <div>
        <ul>
         {this.state.test}
        </ul>
      </div>
    )
  }
}

export default Transit;
