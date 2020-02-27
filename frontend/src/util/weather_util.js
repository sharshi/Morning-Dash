import axios from "axios";

export const weather = coords => {
  debugger
  return axios.post('api/weather', coords[0]);
    // .then(function(response) {
    //   debugger
    //   console.log(response);
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });
};
