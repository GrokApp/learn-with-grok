import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Team from "./components/Team";
import Mission from "./components/Mission";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SignupSuccessful from "./components/SignupSuccessful";
import Library from "./components/Library";
import Settings from "./components/Settings";
import Signout from "./components/Signout";
import AuthContext from 'contexts/AuthContext';
import LanguageContext from 'contexts/LanguageContext';

const HomePage = (props) => {
  const auth = useContext(AuthContext);

  if (auth.loggedIn) {
    return (
      <Redirect to="/library" />
    );
  }

  return (
    <Route path="/">
      <Home
        handleChangeLanguageIWantToLearn={props.handleChangeLanguageIWantToLearn}
        languageIWantToLearn={props.languageIWantToLearn}
        siteLanguage={props.siteLanguage}
      />
    </Route>
  )
}

function Routes(props) {
  const languageCtx = useContext(LanguageContext);

  let siteLanguage = languageCtx.siteLanguage;

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
      <PrivateRoute path="/success">
        <SignupSuccessful />
      </PrivateRoute>
      <PrivateRoute path="/library">
        <Library
          languageIWantToLearn={props.languageIWantToLearn}
          siteLanguage={siteLanguage}
        />
      </PrivateRoute>
      <PrivateRoute path="/settings">
        <Settings />
      </PrivateRoute>
      <PrivateRoute path="/signout">
        <Signout />
      </PrivateRoute>
      <HomePage
        handleChangeLanguageIWantToLearn={props.handleChangeLanguageIWantToLearn}
        languageIWantToLearn={props.languageIWantToLearn}
        siteLanguage={siteLanguage}
      />
      <Route path="/">
        <Home
          handleChangeLanguageIWantToLearn={props.handleChangeLanguageIWantToLearn}
          languageIWantToLearn={props.languageIWantToLearn}
          siteLanguage={siteLanguage}
        />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
