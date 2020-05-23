export const ANSWER_BEGIN = "ANSWER_BEGIN";
export const ANSWER_SUCCESS = "ANSWER_SUCCESS";
export const ANSWER_FAILURE = "ANSWER_FAILURE";

export const answerBegin = () => {
  return {
    type: ANSWER_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const answerSuccess = answer => {
  return {
    type: ANSWER_SUCCESS,
    payload: {
      loading: false,
      answer: answer
    }
  }
}

export const answerFailure = error => {
  return {
    type: ANSWER_FAILURE,
    payload: error
  }
}
