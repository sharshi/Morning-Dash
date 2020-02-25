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
    var origin = '770 eastern parkway 11213';
    var destination = '90 5th ave 10011';
    var request = {
      origin,
      destination,
      travelMode: 'TRANSIT'
    };
    let res;
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        debugger
        res = response.routes[0].legs[0].distance.text;
        this.setState({ test: res });
        console.log(res)
      }
    })
  }

  render() {
    return (
      <div>
        
        {this.state.test}
      </div>
    )
  }
}

export default Transit;
