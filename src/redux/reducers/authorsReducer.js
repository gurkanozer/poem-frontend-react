import * as actionTypes from "../actions/actionTypes";
import { initialState } from "../initialState";

export default function authorsReducer(state = initialState.authors, action) {
  switch (action.type) {
    //GET AUTHORS
    case actionTypes.GET_AUTHORS_SUCCESS:
      return action.payload;
    //ADD AUTHOR
    case actionTypes.ADD_AUTHOR_SUCCESS:
      //buradaki if koşulunun amacını test et.
      if (state.length > 0) return [...state, { ...action.payload }];
      else return [{ ...action.payload }];
    //UPDATE AUTHOR
    case actionTypes.UPDATE_AUTHOR_SUCCESS:
      const stateAfterUpdate = state.map((author) => {
        if (author.id === action.payload.id) return action.payload;
        return author;
      });
      return stateAfterUpdate;
    //DELETE AUTHOR
    case actionTypes.DELETE_AUTHOR_SUCCESS:
      const stateAfterDelete = state.filter(
        (author) => author.id !== action.payload
      );
      return stateAfterDelete;
    //DEFAULT
    default:
      return state;
  }
}
