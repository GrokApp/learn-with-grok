import axios from 'axios';
import baseUrl from 'config';
import {
  userSignupBegin,
  userSignupSuccess,
  userSignupFailure,
  loginBegin,
  loginSuccess,
  loginFailure,
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
