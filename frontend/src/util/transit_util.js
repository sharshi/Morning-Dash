import axios from 'axios';

export const transit = ({origin, destination, key}) => {
  return axios.get("https://maps.googleapis.com/maps/api/directions/json", {
    params: {
      origin: encodeURI(origin),
      destination: encodeURI(destination),
      key
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Accept': 'application/json'
    }})
    .then(response => console.log(response))
    .catch(err => {
      debugger
      console.log(err)                     //Axios entire error message
      console.log(err.response.data) //Google API error message 
    });
};
