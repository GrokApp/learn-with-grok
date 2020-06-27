import {
  USER_SIGNUP_BEGIN,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_BEGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_BEGIN,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  SEND_VERIFY_EMAIL_BEGIN,
  SEND_VERIFY_EMAIL_SUCCESS,
  SEND_VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_BEGIN,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  SEND_RESET_PASSWORD_BEGIN,
  SEND_RESET_PASSWORD_SUCCESS,
  SEND_RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CHECK_RESET_PASSWORD_TOKEN_BEGIN,
  CHECK_RESET_PASSWORD_TOKEN_SUCCESS,
  CHECK_RESET_PASSWORD_TOKEN_FAILURE,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPLOAD_AVATAR_BEGIN,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../actions/userActions";

const initialState = {
  user: null,
  loading: false,
  error: false,
}

export default function excerptReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case USER_SIGNUP_BEGIN:
      return {
        ...state,
        loading: true,
        signupError: null
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      }
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        signupError: action.payload.data,
      }
    case USER_LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        loginError: null
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      }
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loginError: action.payload.data,
      }
    case USER_LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
        loginError: null
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        logoutStatus: action.payload.logoutStatus,
      }
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        loginError: action.payload.data,
      }
    case SEND_VERIFY_EMAIL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SEND_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload.currentUser,
      }
    case SEND_VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case VERIFY_EMAIL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload.currentUser,
      }
    case VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case SEND_RESET_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SEND_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        passwordReset: action.payload.passwordReset,
      }
    case SEND_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case RESET_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        passwordReset: action.payload.passwordReset,
      }
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CHECK_RESET_PASSWORD_TOKEN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CHECK_RESET_PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenValid: action.payload.tokenValid,
      }
    case CHECK_RESET_PASSWORD_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case FETCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload.currentUser,
      }
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPLOAD_AVATAR_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadStatus: action.payload.uploadStatus,
      }
    case UPLOAD_AVATAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPDATE_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload.user,
      }
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.data,
      }
    default:
      return state;
  }
}
