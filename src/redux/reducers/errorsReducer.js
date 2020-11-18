import { GET_ERRORS } from "../actions/actionTypes";
import { initialState } from "../initialState";

export default function errorsReducer(state = initialState.errors, action) {
  switch (action.type) {
    case GET_ERRORS:
      return { msg: action.payload };

    default:
      return state;
  }
}
