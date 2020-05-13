export const USER_SIGNUP_BEGIN = "USER_SIGNUP_BEGIN";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

export const USER_LOGIN_BEGIN = "USER_LOGIN_BEGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT_BEGIN = "USER_LOGOUT_BEGIN";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

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

export const loginBegin = () => {
  return {
    type: USER_LOGIN_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const loginSuccess = user => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      loading: false,
      user: user
    }
  }
}

export const loginFailure = error => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error
  }
}

export const logoutBegin = () => {
  return {
    type: USER_LOGOUT_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const logoutSuccess = logoutStatus => {
  return {
    type: USER_LOGOUT_SUCCESS,
    payload: {
      loading: false,
      logoutStatus: logoutStatus
    }
  }
}

export const logoutFailure = error => {
  return {
    type: USER_LOGOUT_FAILURE,
    payload: error
  }
}
