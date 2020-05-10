import {
  TRANSLATE_BEGIN,
  TRANSLATE_SUCCESS,
  TRANSLATE_FAILURE,
} from "../actions/translateActions";

const initialState = {
  translatedText: "",
  loading: false,
  error: false,
}

export default function translateReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case TRANSLATE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TRANSLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        translatedText: action.payload.translatedText,
      }
    case TRANSLATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        translatedText: null,
      }
    default:
      return state;
  }
}
