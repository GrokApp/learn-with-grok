import { combineReducers } from "redux";
import translate from "./translateReducer";
import excerpt from "./excerptReducer";

const rootReducer = combineReducers({
  translate,
  excerpt,
});

export default rootReducer;
