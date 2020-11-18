import { combineReducers } from "redux";
import poems from "./poemsReducer";
import authors from "./authorsReducer";
import genres from "./genresReducer";
import errors from "./errorsReducer";
import messages from "./alertsReducer";
import auth from "./authReducer";

export default combineReducers({
  poems,
  authors,
  genres,
  messages,
  errors,
  auth,
});
