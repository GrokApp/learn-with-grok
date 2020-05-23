import {
  ANSWER_BEGIN,
  ANSWER_SUCCESS,
  ANSWER_FAILURE,
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
        answer: action.payload.answer,
      }
    case ANSWER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        answer: null,
      }
    default:
      return state;
  }
}
