import {
  SENTENCE_TOKENIZE_BEGIN,
  SENTENCE_TOKENIZE_SUCCESS,
  SENTENCE_TOKENIZE_FAILURE,
} from "../actions/excerptActions";

const initialState = {
  tokenizedExcerpt: [],
  loading: false,
  error: false,
}

export default function excerptReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case SENTENCE_TOKENIZE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SENTENCE_TOKENIZE_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenizedExcerpt: action.payload.tokenizedExcerpt,
      }
    case SENTENCE_TOKENIZE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
