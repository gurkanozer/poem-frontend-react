import { CREATE_MESSAGE } from "../actions/actionTypes";
import { initialState } from "../initialState";

export default function alertsReducer(state = initialState.messages, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}
