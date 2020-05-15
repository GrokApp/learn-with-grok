export const USER_SIGNUP_BEGIN = "USER_SIGNUP_BEGIN";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

export const USER_LOGIN_BEGIN = "USER_LOGIN_BEGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT_BEGIN = "USER_LOGOUT_BEGIN";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

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
