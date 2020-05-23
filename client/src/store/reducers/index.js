import { combineReducers } from "redux";
import translate from "./translateReducer";
import excerpt from "./excerptReducer";
import user from "./userReducer";
import library from "./libraryReducer";
import story from "./storyReducer";

const rootReducer = combineReducers({
  translate,
  excerpt,
  library,
  story,
  user
});

export default rootReducer;
