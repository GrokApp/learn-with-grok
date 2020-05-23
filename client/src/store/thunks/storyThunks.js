import axios from 'axios';
import baseUrl from 'config';
import {
  answerBegin,
  answerSuccess,
  answerFailure,
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
