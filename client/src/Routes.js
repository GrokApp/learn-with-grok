import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import Team from "./components/Team";
import Mission from "./components/Mission";
import Signup from "./components/Signup";
import Login from "./components/Login";

class Routes extends React.Component {
  render() {

    const {
      siteLanguage,
    } = this.props;

    return (
      <Switch>
        <Route path="/mission">
          <Mission />
        </Route>
        <Route path="/team">
          <Team />
        </Route>
        <Route path="/signup">
          <Signup
            siteLanguage={siteLanguage}
          />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home
            handleChangeLanguageIWantToLearn={this.props.handleChangeLanguageIWantToLearn}
            languageIWantToLearn={this.props.languageIWantToLearn}
            siteLanguage={siteLanguage}
          />
        </Route>
      </Switch>
    );
  }
}

function About() {
  return <h2>About</h2>;
}

export default Routes;
