import { combineReducers } from "redux";
import translate from "./translateReducer";
import excerpt from "./excerptReducer";
import user from "./userReducer";
import library from "./libraryReducer";
import story from "./storyReducer";
import error from "./errorReducer";

const rootReducer = combineReducers({
  translate,
  excerpt,
  library,
  story,
  user,
  error
});

export default rootReducer;
