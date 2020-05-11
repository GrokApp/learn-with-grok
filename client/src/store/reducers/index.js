import { combineReducers } from "redux";
import translate from "./translateReducer";
import excerpt from "./excerptReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  translate,
  excerpt,
  user
});

export default rootReducer;
