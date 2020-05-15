import { combineReducers } from "redux";
import translate from "./translateReducer";
import excerpt from "./excerptReducer";
import user from "./userReducer";
import library from "./libraryReducer";

const rootReducer = combineReducers({
  translate,
  excerpt,
  library,
  user
});

export default rootReducer;
