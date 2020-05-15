import {
  FETCH_LIBRARY_BEGIN,
  FETCH_LIBRARY_SUCCESS,
  FETCH_LIBRARY_FAILURE,
} from "../actions/libraryActions";

const initialState = {
  library: "",
  loading: false,
  error: false,
}

export default function libraryReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case FETCH_LIBRARY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_LIBRARY_SUCCESS:
      return {
        ...state,
        loading: false,
        library: action.payload.library,
      }
    case FETCH_LIBRARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        library: null,
      }
    default:
      return state;
  }
}
