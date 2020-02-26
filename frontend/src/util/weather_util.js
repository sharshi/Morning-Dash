import axios from "axios";

export const weather = coords => {
  return axios
    .get(
      `https://api.darksky.net/forecast/${keys.darkSkyAPI}/${coords.lat},${coords.lng}`
    )
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
