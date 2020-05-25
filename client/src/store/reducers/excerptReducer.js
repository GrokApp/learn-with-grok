import {
  SENTENCE_TOKENIZE_BEGIN,
  SENTENCE_TOKENIZE_SUCCESS,
  SENTENCE_TOKENIZE_FAILURE,
  TEXT_TO_SPEECH_BEGIN,
  TEXT_TO_SPEECH_SUCCESS,
  TEXT_TO_SPEECH_FAILURE,
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
    case TEXT_TO_SPEECH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TEXT_TO_SPEECH_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        speech: action.payload.speech,
      }
    case TEXT_TO_SPEECH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
