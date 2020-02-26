import axios from "axios";

export const weather = coords => {
  return axios
    .get('api/weather', coords)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
