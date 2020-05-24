import axios from 'axios';
import baseUrl from 'config';
import {
  answerBegin,
  answerSuccess,
  answerFailure,
  newAttemptBegin,
  newAttemptSuccess,
  newAttemptFailure,
  fetchAttemptsBegin,
  fetchAttemptsSuccess,
  fetchAttemptsFailure,
} from "../actions/storyActions";

export function answer(options) {
  let accessToken = localStorage.getItem('accessToken');

  return dispatch => {
    dispatch(answerBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/story/answer`,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      data: options
    });

    return request.then(
      response => dispatch(answerSuccess(response.data)),
      err => dispatch(answerFailure(err)),
    )
  }
}


export function newAttempt(options) {
  let accessToken = localStorage.getItem('accessToken');

  return dispatch => {
    dispatch(newAttemptBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/story/attempt/new`,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      data: options
    });

    return request.then(
      response => dispatch(newAttemptSuccess(response.data)),
      err => dispatch(newAttemptFailure(err)),
    )
  }
}

export function fetchAttempts(options) {
  let accessToken = localStorage.getItem('accessToken');

  return dispatch => {
    dispatch(fetchAttemptsBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/story/attempt/fetch`,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      data: options
    });

    return request.then(
      response => dispatch(fetchAttemptsSuccess(response.data)),
      err => dispatch(fetchAttemptsFailure(err)),
    )
  }
}
