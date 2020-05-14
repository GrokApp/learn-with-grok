import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';
import { isLoggedIn } from 'helpers/helpers';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth)
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  useEffect(() => {
    let loggedIn = isLoggedIn()
    setIsAuthenticated(loggedIn);
    // eslint-disable-next-line
  }, [auth])

  if(isAuthenticated === null){
    return <></>
  }
  if (!isAuthenticated) {
    return <Redirect to='/login'/>;
  }
  return (
    <Route {...rest} render={props => <Component {...props} />} />
  );
};

export default PrivateRoute;
