import * as actionTypes from "../actions/actionTypes";
import { initialState } from "../initialState";

export default function genresReducer(state = initialState.genres, action) {
  switch (action.type) {
    //GET GENRES
    case actionTypes.GET_GENRES_SUCCESS:
      return action.payload;
    //ADD GENRE
    case actionTypes.ADD_GENRE_SUCCESS:
      if (state.length > 0) return [...state, { ...action.payload }];
      else return [{ ...action.payload }];
    //UPDATE GENRE
    case actionTypes.UPDATE_GENRE_SUCCESS:
      const stateAfterUpdate = state.map((genre) => {
        if (genre.id === action.payload.id) return action.payload;
        return genre;
      });
      return stateAfterUpdate;
    //DELETE GENRE
    case actionTypes.DELETE_GENRE_SUCCESS:
      const stateAfterDelete = state.filter(
        (genre) => genre.id !== action.payload
      );
      return stateAfterDelete;
    //DEFAULT
    default:
      return state;
  }
}
