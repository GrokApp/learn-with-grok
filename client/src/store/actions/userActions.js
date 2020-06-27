export const USER_SIGNUP_BEGIN = "USER_SIGNUP_BEGIN";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

export const USER_LOGIN_BEGIN = "USER_LOGIN_BEGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT_BEGIN = "USER_LOGOUT_BEGIN";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

export const SEND_VERIFY_EMAIL_BEGIN = "SEND_VERIFY_EMAIL_BEGIN";
export const SEND_VERIFY_EMAIL_SUCCESS = "SEND_VERIFY_EMAIL_SUCCESS";
export const SEND_VERIFY_EMAIL_FAILURE = "SEND_VERIFY_EMAIL_FAILURE";

export const VERIFY_EMAIL_BEGIN = "VERIFY_EMAIL_BEGIN";
export const VERIFY_EMAIL_SUCCESS = "VERIFY_EMAIL_SUCCESS";
export const VERIFY_EMAIL_FAILURE = "VERIFY_EMAIL_FAILURE";

export const SEND_RESET_PASSWORD_BEGIN = "SEND_RESET_PASSWORD_BEGIN";
export const SEND_RESET_PASSWORD_SUCCESS = "SEND_RESET_PASSWORD_SUCCESS";
export const SEND_RESET_PASSWORD_FAILURE = "SEND_RESET_PASSWORD_FAILURE";

export const RESET_PASSWORD_BEGIN = "RESET_PASSWORD_BEGIN";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export const CHECK_RESET_PASSWORD_TOKEN_BEGIN = "CHECK_RESET_PASSWORD_TOKEN_BEGIN";
export const CHECK_RESET_PASSWORD_TOKEN_SUCCESS = "CHECK_RESET_PASSWORD_TOKEN_SUCCESS";
export const CHECK_RESET_PASSWORD_TOKEN_FAILURE = "CHECK_RESET_PASSWORD_TOKEN_FAILURE";

export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const UPLOAD_AVATAR_BEGIN = "UPLOAD_AVATAR_BEGIN";
export const UPLOAD_AVATAR_SUCCESS = "UPLOAD_AVATAR_SUCCESS";
export const UPLOAD_AVATAR_FAILURE = "UPLOAD_AVATAR_FAILURE";

export const UPDATE_USER_BEGIN = "UPDATE_USER_BEGIN";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

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

export const sendVerifyEmailBegin = () => {
  return {
    type: SEND_VERIFY_EMAIL_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const sendVerifyEmailSuccess = currentUser => {
  return {
    type: SEND_VERIFY_EMAIL_SUCCESS,
    payload: {
      loading: false,
      currentUser: currentUser
    }
  }
}

export const sendVerifyEmailFailure = error => {
  return {
    type: SEND_VERIFY_EMAIL_FAILURE,
    payload: error
  }
}

export const verifyEmailBegin = () => {
  return {
    type: VERIFY_EMAIL_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const verifyEmailSuccess = currentUser => {
  return {
    type: VERIFY_EMAIL_SUCCESS,
    payload: {
      loading: false,
      currentUser: currentUser
    }
  }
}

export const verifyEmailFailure = error => {
  return {
    type: VERIFY_EMAIL_FAILURE,
    payload: error
  }
}

export const sendResetPasswordBegin = () => {
  return {
    type: SEND_RESET_PASSWORD_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const sendResetPasswordSuccess = resetPassword => {
  return {
    type: SEND_RESET_PASSWORD_SUCCESS,
    payload: {
      loading: false,
      resetPassword: resetPassword
    }
  }
}

export const sendResetPasswordFailure = error => {
  return {
    type: SEND_RESET_PASSWORD_FAILURE,
    payload: error
  }
}

export const resetPasswordBegin = () => {
  return {
    type: RESET_PASSWORD_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const resetPasswordSuccess = results => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: {
      loading: false,
      passwordReset: results
    }
  }
}

export const resetPasswordFailure = error => {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error
  }
}

export const checkResetPasswordTokenBegin = () => {
  return {
    type: CHECK_RESET_PASSWORD_TOKEN_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const checkResetPasswordTokenSuccess = tokenValid => {
  return {
    type: CHECK_RESET_PASSWORD_TOKEN_SUCCESS,
    payload: {
      loading: false,
      tokenValid: tokenValid
    }
  }
}

export const checkResetPasswordTokenFailure = error => {
  return {
    type: CHECK_RESET_PASSWORD_TOKEN_FAILURE,
    payload: error
  }
}

export const fetchUserBegin = () => {
  return {
    type: FETCH_USER_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const fetchUserSuccess = currentUser => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: {
      loading: false,
      currentUser: currentUser
    }
  }
}

export const fetchUserFailure = error => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error
  }
}

export const uploadAvatarBegin = () => {
  return {
    type: UPLOAD_AVATAR_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const uploadAvatarSuccess = uploadStatus => {
  return {
    type: UPLOAD_AVATAR_SUCCESS,
    payload: {
      loading: false,
      uploadStatus: uploadStatus
    }
  }
}

export const uploadAvatarFailure = error => {
  return {
    type: UPLOAD_AVATAR_FAILURE,
    payload: error
  }
}

export const updateUserBegin = () => {
  return {
    type: UPDATE_USER_BEGIN,
    payload: {
      loading: true
    }
  }
}

export const updateUserSuccess = user => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: {
      loading: false,
      user: user
    }
  }
}

export const updateUserFailure = error => {
  return {
    type: UPDATE_USER_FAILURE,
    payload: error
  }
}
