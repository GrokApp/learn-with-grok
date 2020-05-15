export const FETCH_LIBRARY_BEGIN = "FETCH_LIBRARY_BEGIN";
export const FETCH_LIBRARY_SUCCESS = "FETCH_LIBRARY_SUCCESS";
export const FETCH_LIBRARY_FAILURE = "FETCH_LIBRARY_FAILURE";

export const fetchLibraryBegin = () => {
  return {
    type: FETCH_LIBRARY_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const fetchLibrarySuccess = library => {
  return {
    type: FETCH_LIBRARY_SUCCESS,
    payload: {
      loading: false,
      library: library
    }
  }
}

export const fetchLibraryFailure = error => {
  return {
    type: FETCH_LIBRARY_FAILURE,
    payload: error
  }
}
