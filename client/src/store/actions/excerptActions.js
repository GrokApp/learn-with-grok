export const SENTENCE_TOKENIZE_BEGIN = "SENTENCE_TOKENIZE_BEGIN";
export const SENTENCE_TOKENIZE_SUCCESS = "SENTENCE_TOKENIZE_SUCCESS";
export const SENTENCE_TOKENIZE_FAILURE = "SENTENCE_TOKENIZE_FAILURE";

export const sentenceTokenizeBegin = () => {
  return {
    type: SENTENCE_TOKENIZE_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const sentenceTokenizeSuccess = tokenizedExcerpt => {
  return {
    type: SENTENCE_TOKENIZE_SUCCESS,
    payload: {
      loading: false,
      tokenizedExcerpt: tokenizedExcerpt
    }
  }
}

export const sentenceTokenizeFailure = error => {
  return {
    type: SENTENCE_TOKENIZE_FAILURE,
    payload: error
  }
}
