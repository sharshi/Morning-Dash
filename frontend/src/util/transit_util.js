  /*global google*/

  export const fetchTransit = (timeOfDay, homeAddress, workAddress) => {
    var directionsService = new google.maps.DirectionsService();
    var origin = homeAddress;
    var destination = workAddress;
    var request = {
      origin,
      destination,
      travelMode: "TRANSIT"
    };
    let res;
    
    return directionsService.route(request, (response, status) => {
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
      return { morning: { departureTime, res } };
    }
    else {
      return 'not found';
    }
  });
}
