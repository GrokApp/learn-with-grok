export const SENTENCE_TOKENIZE_BEGIN = "SENTENCE_TOKENIZE_BEGIN";
export const SENTENCE_TOKENIZE_SUCCESS = "SENTENCE_TOKENIZE_SUCCESS";
export const SENTENCE_TOKENIZE_FAILURE = "SENTENCE_TOKENIZE_FAILURE";
export const TEXT_TO_SPEECH_BEGIN = "TEXT_TO_SPEECH_BEGIN";
export const TEXT_TO_SPEECH_SUCCESS = "TEXT_TO_SPEECH_SUCCESS";
export const TEXT_TO_SPEECH_FAILURE = "TEXT_TO_SPEECH_FAILURE";

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

export const textToSpeechBegin = () => {
  return {
    type: TEXT_TO_SPEECH_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const textToSpeechSuccess = speech => {
  return {
    type: TEXT_TO_SPEECH_SUCCESS,
    payload: {
      loading: false,
      speech: speech
    }
  }
}

export const textToSpeechFailure = error => {
  return {
    type: TEXT_TO_SPEECH_FAILURE,
    payload: error
  }
}
