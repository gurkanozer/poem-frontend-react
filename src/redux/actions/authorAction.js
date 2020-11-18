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

// GET ALL AUTHORS...
export const getAuthors = () => (dispatch, getState) => {
  const config = setConfig(getState);
  axios.get("/authors", config).then((response) => {
    dispatch(setAction(actionTypes.GET_AUTHORS_SUCCESS, response.data));
  });
};

// ADD AUTHOR ------------------------------
export const addAuthor = (data) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .post("/authors", data, config)
    .then((response) => {
      dispatch(setAction(actionTypes.ADD_AUTHOR_SUCCESS, response.data));
      dispatch(createMessage({ authorAdded: "Şair eklendi." }));
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE AUTHOR ------------------------------
export const deleteAuthor = (id) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .delete(`/authors/${id}`, config)
    .then((response) => {
      dispatch(setAction(actionTypes.DELETE_AUTHOR_SUCCESS, id));
      dispatch(createMessage({ authorDeleted: "Şair silindi." }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.data, err.status));
    });
};

//UPDATE AUTHOR -------------------------------
export const updateAuthor = (data) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .put(`/authors/${data.id}`, data, config)
    .then((response) => {
      dispatch(setAction(actionTypes.UPDATE_AUTHOR_SUCCESS, response.data));
      dispatch(createMessage({ authorUpdated: "Şair düzenlendi." }));
    })
    .catch((err) => {
      dispatch(returnErrors({ message: err.response }));
    });
};
