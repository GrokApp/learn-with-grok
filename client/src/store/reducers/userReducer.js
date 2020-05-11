import {
  USER_SIGNUP_BEGIN,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
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
        error: null
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
        error: action.payload,
      }
    default:
      return state;
  }
}
