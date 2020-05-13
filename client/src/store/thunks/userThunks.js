import axios from 'axios';
import baseUrl from 'config';
import {
  userSignupBegin,
  userSignupSuccess,
  userSignupFailure,
  loginBegin,
  loginSuccess,
  loginFailure,
  logoutBegin,
  logoutSuccess,
  logoutFailure,
  fetchUserBegin,
  fetchUserSuccess,
  fetchUserFailure,
} from "../actions/userActions";

export function userSignup(options) {
  return dispatch => {
    dispatch(userSignupBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/user/signup`,
      headers: { 'Content-Type': 'application/json' },
      data: options
    });

    return request.then(
      response => dispatch(userSignupSuccess(response.data)),
      err => dispatch(userSignupFailure(err.response)),
    )
  }
}

export function login(options) {
  return dispatch => {
    dispatch(loginBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/user/login`,
      headers: { 'Content-Type': 'application/json' },
      data: options
    });

    return request.then(
      response => dispatch(loginSuccess(response.data)),
      err => dispatch(loginFailure(err.response)),
    )
  }
}

export function logout(options) {
  let accessToken = localStorage.getItem('accessToken');

  return dispatch => {
    dispatch(logoutBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/user/logout`,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      data: options
    });

    return request.then(
      response => dispatch(logoutSuccess(response.data)),
      err => dispatch(logoutFailure(err.response)),
    )
  }
}

export function fetchUser(options) {
  let accessToken = localStorage.getItem('accessToken');

  return dispatch => {
    dispatch(fetchUserBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/user/fetch`,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      data: options
    });

    return request.then(
      response => dispatch(fetchUserSuccess(response.data)),
      err => dispatch(fetchUserFailure(err.response)),
    )
  }
}
