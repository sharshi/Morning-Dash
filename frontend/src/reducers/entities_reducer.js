import { combineReducers } from "redux";
import weather from "./weather_reducer";
import transit from "./transit_reducer";
import events from "./events_reducer";

export default combineReducers({
  weather,
  transit,
  events
});
