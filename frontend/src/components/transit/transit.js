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
    // this.props.homeAddress
    var origin = "21456 Holly Oak Dr Cupertino, CA 95014";
    // this.props.workAddress
    var destination = "4855 Atherton Ave San Jose, CA 95130";
    var request = {
      origin,
      destination,
      travelMode: "TRANSIT"
    };
    let res;
    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        debugger;
        res = response.routes[0].legs[0].steps.map(step => {
          const { travel_mode } = step;
          return <li>{travel_mode}</li>;
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
