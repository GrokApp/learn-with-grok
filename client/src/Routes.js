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

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/mission">
          <Mission />
        </Route>
        <Route path="/team">
          <Team />
        </Route>
        <Route path="/">
          <Home
            handleChangeLanguageIWantToLearn={this.props.handleChangeLanguageIWantToLearn}
            languageIWantToLearn={this.props.languageIWantToLearn}
            siteLanguage={this.props.siteLanguage}
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
