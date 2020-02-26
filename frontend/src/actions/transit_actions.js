export const TRANSIT_UPDATE = 'TRANSIT_UPDATE';
import { fetchTransit } from "../util/transit_util";
const transitUpdate = transitInfo => ({
  type: TRANSIT_UPDATE,
  transitInfo
});

export const transit = timeOfDay => dispatch => {
  return fetchTransit(timeOfDay)
    .then(res => {
      dispatch(transitUpdate(res));
    })         
};