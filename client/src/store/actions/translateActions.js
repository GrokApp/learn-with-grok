export const TRANSLATE_BEGIN = "TRANSLATE_BEGIN";
export const TRANSLATE_SUCCESS = "TRANSLATE_SUCCESS";
export const TRANSLATE_FAILURE = "TRANSLATE_FAILURE";

export const translateBegin = () => {
  return {
    type: TRANSLATE_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const translateSuccess = translatedText => {
  return {
    type: TRANSLATE_SUCCESS,
    payload: {
      loading: false,
      translatedText: translatedText
    }
  }
}

export const translateFailure = error => {
  return {
    type: TRANSLATE_FAILURE,
    payload: error
  }
}
