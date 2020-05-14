import React, { useContext } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
} from "react-router-dom";
import AuthContext from 'contexts/AuthContext';

import {
  logout
} from "store/thunks/userThunks";

const Logout = () => {
  const auth = useContext(AuthContext);
  auth.setCurrentUser(null);

  localStorage.removeItem('accessToken');
  return <Redirect to="/" />;
}

class Signout extends React.Component {
  componentWillMount() {
    const {
      logout,
    } = this.props;

    logout();
  }

  render() {
    return (
      <Logout />
    )
  }
}

const mapStateToProps = state => ({
  error: state.user.error,
  logoutStatus: state.user.logoutStatus
});

const mapDispatchToProps = dispatch => ({
  logout: (event, data) => dispatch(logout(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
