import keys from '../../../config/keys';
import axios from "axios";

export const weather = (coords) => {
    return axios.get(`https://api.darksky.net/forecast/${keys.darkSkyAPI}/${coords.lat},${coords.lng}`);
}

