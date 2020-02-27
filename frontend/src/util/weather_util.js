import axios from "axios";

export const weather = coords => {
  return axios.post('api/weather', coords[0]);
};
