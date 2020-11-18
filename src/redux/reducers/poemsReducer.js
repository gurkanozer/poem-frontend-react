import * as actionTypes from "../actions/actionTypes";
import { initialState } from "../initialState";

export default function poemsReducer(state = initialState.poems, action) {
  switch (action.type) {
    //GET POEM
    case actionTypes.GET_POEMS_SUCCESS:
      return action.payload;
    //ADD POEM
    case actionTypes.ADD_POEM_SUCCESS:
      return [...state, { ...action.payload }];
    //DELETE POEM
    case actionTypes.DELETE_POEM_SUCCESS:
      const stateAfterDelete = state.filter(
        (poem) => poem.id !== action.payload
      );
      return stateAfterDelete;
    //UPDATE POEM
    case actionTypes.UPDATE_POEM_SUCCESS:
      const stateAfterUpdate = state.map((poem) => {
        if (poem.id === action.payload.id) return action.payload;
        return poem;
      });
      return stateAfterUpdate;
    //DEFAULT
    default:
      return state;
  }
}
