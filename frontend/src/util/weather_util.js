import axios from "axios";

/*Send coordinates to back end for Dark Sky API. 
  Needed to send first element of coords because it is a 2D array.
  Made it a post request because axios get request does not send a body back. */
export const weather = coords => {
  return axios.post('api/weather', coords[0]);
};
