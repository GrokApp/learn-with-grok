export const USER_SIGNUP_BEGIN = "USER_SIGNUP_BEGIN";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

export const userSignupBegin = () => {
  return {
    type: USER_SIGNUP_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const userSignupSuccess = user => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: {
      loading: false,
      user: user
    }
  }
}

export const userSignupFailure = error => {
  return {
    type: USER_SIGNUP_FAILURE,
    payload: error
  }
}
