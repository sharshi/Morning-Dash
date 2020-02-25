export const TRANSIT_UPDATE = 'TRANSIT_UPDATE';

export const transitUpdate = transitInfo => ({
  type: TRANSIT_UPDATE,
  transitInfo
});