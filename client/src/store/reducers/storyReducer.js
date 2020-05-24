import {
  ANSWER_BEGIN,
  ANSWER_SUCCESS,
  ANSWER_FAILURE,
  NEW_ATTEMPT_BEGIN,
  NEW_ATTEMPT_SUCCESS,
  NEW_ATTEMPT_FAILURE,
  FETCH_ATTEMPTS_BEGIN,
  FETCH_ATTEMPTS_SUCCESS,
  FETCH_ATTEMPTS_FAILURE,
} from "../actions/storyActions";

const initialState = {
  library: "",
  loading: false,
  error: false,
}

export default function storyReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case ANSWER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
        attempt: action.payload.attempt,
      }
    case ANSWER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        attempt: null,
      }
    case NEW_ATTEMPT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case NEW_ATTEMPT_SUCCESS:
      return {
        ...state,
        loading: false,
        attempt: action.payload.attempt,
      }
    case NEW_ATTEMPT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        attempt: null,
      }
    case FETCH_ATTEMPTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_ATTEMPTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userAttempts: action.payload.userAttempts,
      }
    case FETCH_ATTEMPTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userAttempts: null,
      }
    default:
      return state;
  }
}
