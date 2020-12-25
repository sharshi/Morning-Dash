import { combineReducers } from "redux";
import user from "./user_reducer";
import weather from "./weather_reducer";
import transit from "./transit_reducer";
import events from "./events_reducer";

export default combineReducers({
  user,
  weather,
  transit,
  events
});
