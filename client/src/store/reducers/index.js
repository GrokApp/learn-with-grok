import { combineReducers } from "redux";
import translate from "./translateReducer";

const rootReducer = combineReducers({
  translate,
});

export default rootReducer;
