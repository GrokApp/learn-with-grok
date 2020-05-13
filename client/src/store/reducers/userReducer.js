import {
  USER_SIGNUP_BEGIN,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_BEGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
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
    default:
      return state;
  }
}
