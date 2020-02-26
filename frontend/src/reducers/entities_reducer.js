import { combineReducers } from "redux";
import settings from "./settings_reducer";
import weather from "./weather_reducer";
import transit from "./transit_reducer";
import events from "./events_reducer";

export default combineReducers({
  settings,
  weather,
  transit,
  events
});
