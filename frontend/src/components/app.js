import React from "react";
import { AuthRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import GoogleLogin from "./session/google_login";
import MainPageContainer from "./main/main_page_container";
import "./main.scss";

const App = () => (
  <section className="app-container">
    <Switch>
      <AuthRoute exact path="/" component={MainPageContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </section>
);

export default App;
