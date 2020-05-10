import axios from 'axios';
import baseUrl from 'config';
import {
  translateBegin,
  translateSuccess,
  translateFailure,
} from "../actions/translateActions";

export function translateText(options) {
  return dispatch => {
    dispatch(translateBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/translate`,
      headers: { 'Content-Type': 'application/json' },
      data: options
    });

    return request.then(
      response => dispatch(translateSuccess(response.data)),
      err => dispatch(translateFailure(err)),
    )
  }
}
