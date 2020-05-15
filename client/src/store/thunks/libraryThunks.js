import axios from 'axios';
import baseUrl from 'config';
import {
  fetchLibraryBegin,
  fetchLibrarySuccess,
  fetchLibraryFailure,
} from "../actions/libraryActions";

export function fetchLibrary(options) {
  return dispatch => {
    dispatch(fetchLibraryBegin());
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/library/fetch`,
      headers: { 'Content-Type': 'application/json' },
      data: options
    });

    return request.then(
      response => dispatch(fetchLibrarySuccess(response.data)),
      err => dispatch(fetchLibraryFailure(err)),
    )
  }
}
