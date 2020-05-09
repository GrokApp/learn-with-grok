import axios from 'axios';
import baseUrl from 'config';
import {
  sentenceTokenizeBegin,
  sentenceTokenizeSuccess,
  sentenceTokenizeFailure,
} from "../actions/excerptActions";

export function sentenceTokenize(options) {
  return dispatch => {
    dispatch(sentenceTokenizeBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/sentence_tokenize`,
      headers: { 'Content-Type': 'application/json' },
      data: options
    });

    return request.then(
      response => dispatch(sentenceTokenizeSuccess(response.data)),
      err => dispatch(sentenceTokenizeFailure(err)),
    )
  }
}
