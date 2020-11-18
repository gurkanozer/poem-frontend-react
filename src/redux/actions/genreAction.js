import * as actionTypes from "./actionTypes";
import { createMessage, returnErrors } from "../actions/alertAction";
import axios from "axios";
import { setConfig } from "../../helpers/helpers";

function setAction(type, payload) {
  return {
    type,
    payload,
  };
}

// GET ALL GENRES...
export const getGenres = () => (dispatch, getState) => {
  const config = setConfig(getState);
  axios.get("/genres", config).then((response) => {
    dispatch(setAction(actionTypes.GET_GENRES_SUCCESS, response.data));
  });
};
// ADD GENRE ------------------------------
export const addGenre = (data) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .post("/genres", data, config)
    .then((response) => {
      dispatch(setAction(actionTypes.ADD_GENRE_SUCCESS, response.data));
      dispatch(createMessage({ genreAdded: "Kategori eklendi." }));
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE GENRE ------------------------------
export const deleteGenre = (id) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .delete(`/genres/${id}`, config)
    .then((response) => {
      dispatch(setAction(actionTypes.DELETE_GENRE_SUCCESS, id));
      dispatch(createMessage({ genreDeleted: "Kategori silindi." }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.data, err.status));
    });
};

//UPDATE GENRE -------------------------------
export const updateGenre = (data) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .put(`/genres/${data.id}`, data, config)
    .then((response) => {
      dispatch(setAction(actionTypes.UPDATE_GENRE_SUCCESS, response.data));
      dispatch(createMessage({ genreUpdated: "Kategori düzenlendi." }));
    })
    .catch((err) => {
      dispatch(returnErrors({ message: err.response }));
    });
};
