import axios from 'axios';
import baseUrl from 'config';
import {
  sentenceTokenizeBegin,
  sentenceTokenizeSuccess,
  sentenceTokenizeFailure,
  textToSpeechBegin,
  textToSpeechSuccess,
  textToSpeechFailure,
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


export function textToSpeech(options) {
  let accessToken = localStorage.getItem('accessToken');

  return dispatch => {
    dispatch(textToSpeechBegin());
    const request = axios({
      responseType: 'blob',
      method: 'POST',
      url: `${baseUrl}/text_to_speech`,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
      data: options
    });

    return request.then(
      response => dispatch(textToSpeechSuccess(response.data)),
      err => dispatch(textToSpeechFailure(err)),
    )
  }
}
