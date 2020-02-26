  export const fetchTransit = (timeOfDay) => {
    var directionsService = new google.maps.DirectionsService();
      const { homeAddress, workAddress } = this.props.settings;
      var origin = homeAddress;
      var destination = workAddress;
      var request = {
        origin,
        destination,
        travelMode: "TRANSIT",
      };
      let res;
      directionsService.route(request, (response, status) => {
      if (status === "OK") {
        res = response.routes[0].legs[0].steps.map((step, idx) => {
          const { travel_mode, duration, transit } = step;
          
          this.props.transit({ morning: { travel_mode, duration, transit } });
          const departure_time = transit ? transit.departure_time.text : null

          return ({
            travel_mode,
            duration: duration.text,
            departure_time
          });
        });
        const departureTime = response.routes[0].legs[0].departure_time.text;
        return ({ morning: { departureTime, res } });
      } else {
        return null;
      }
    });
  }