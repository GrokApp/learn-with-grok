export const ANSWER_BEGIN = "ANSWER_BEGIN";
export const ANSWER_SUCCESS = "ANSWER_SUCCESS";
export const ANSWER_FAILURE = "ANSWER_FAILURE";
export const NEW_ATTEMPT_BEGIN = "NEW_ATTEMPT_BEGIN";
export const NEW_ATTEMPT_SUCCESS = "NEW_ATTEMPT_SUCCESS";
export const NEW_ATTEMPT_FAILURE = "NEW_ATTEMPT_FAILURE";
export const FETCH_ATTEMPTS_BEGIN = "FETCH_ATTEMPTS_BEGIN";
export const FETCH_ATTEMPTS_SUCCESS = "FETCH_ATTEMPTS_SUCCESS";
export const FETCH_ATTEMPTS_FAILURE = "FETCH_ATTEMPTS_FAILURE";


export const answerBegin = () => {
  return {
    type: ANSWER_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const answerSuccess = userAttempts => {
  return {
    type: ANSWER_SUCCESS,
    payload: {
      loading: false,
      userAttempts: userAttempts
    }
  }
}

export const answerFailure = error => {
  return {
    type: ANSWER_FAILURE,
    payload: error
  }
}

export const newAttemptBegin = () => {
  return {
    type: NEW_ATTEMPT_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const newAttemptSuccess = userAttempts => {
  return {
    type: NEW_ATTEMPT_SUCCESS,
    payload: {
      loading: false,
      userAttempts: userAttempts
    }
  }
}

export const newAttemptFailure = error => {
  return {
    type: NEW_ATTEMPT_FAILURE,
    payload: error
  }
}

export const fetchAttemptsBegin = () => {
  return {
    type: FETCH_ATTEMPTS_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const fetchAttemptsSuccess = userAttempts => {
  return {
    type: FETCH_ATTEMPTS_SUCCESS,
    payload: {
      loading: false,
      userAttempts: userAttempts
    }
  }
}

export const fetchAttemptsFailure = error => {
  return {
    type: FETCH_ATTEMPTS_FAILURE,
    payload: error
  }
}
