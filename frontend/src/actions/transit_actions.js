import { fetchTransit } from "../util/transit_util";
export const TRANSIT_UPDATE = 'TRANSIT_UPDATE';

const transitUpdate = transitInfo => ({
  type: TRANSIT_UPDATE,
  transitInfo
});

export const transit = (res) => dispatch => {
  return dispatch(transitUpdate(res));
};