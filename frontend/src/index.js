import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";
import { weather } from "./util/weather_util";

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // returning signed in user
  if (localStorage.jwtToken) {
    //Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // sets preloadedState to the user pulled from storage
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser }
    };

    store = configureStore(preloadedState);

    // time in seconds
    const currentTime = Date.now() / 1000;
    
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    // jwtToken not found 
    store = configureStore({});
  }

  window.weather = weather;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root)
});