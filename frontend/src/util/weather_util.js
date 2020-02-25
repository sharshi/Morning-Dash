import axios from "axios";

export const weather = (coords) => {
`https://api.darksky.net/forecast/${keys.darkSkyAPI}/${coords.lat},${coords.lng}`    return axios.get();
}

