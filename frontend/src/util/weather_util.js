import axios from "axios";

export const weather = coords => {
  return axios.post("api/weather", coords[0]);
    // .then(function(response) {
    //   console.log(response);
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });
};
