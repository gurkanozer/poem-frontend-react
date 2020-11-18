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

// GET ALL POEMS ------------------------------------
export const getPoems = () => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .get("/poems", config)
    .then((response) => {
      dispatch(setAction(actionTypes.GET_POEMS_SUCCESS, response.data));
    })
    .catch((err) => {
      dispatch(returnErrors({ message: err.response }));
    });
};

// ADD POEM ------------------------------
export const addPoem = (data) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .post("/poems", data, config)
    .then((response) => {
      dispatch(setAction(actionTypes.ADD_POEM_SUCCESS, response.data));
      dispatch(createMessage({ poemAdded: "Şiir eklendi." }));
    })
    .catch((err) => {
      console.log("data: ", err);
      dispatch(returnErrors({ message: err.response }));
    });
};

// DELETE POEM ------------------------------
export const deletePoem = (id) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .delete(`/poems/${id}`, config)
    .then((response) => {
      dispatch(setAction(actionTypes.DELETE_POEM_SUCCESS, id));
      dispatch(createMessage({ poemDeleted: "Şiir silindi." }));
    })
    .catch((err) => {
      dispatch(returnErrors({ message: err.response }));
    });
};

//UPDATE POEM -------------------------------
export const updatePoem = (data) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .put(`/poems/${data.id}`, data, config)
    .then((response) => {
      dispatch(setAction(actionTypes.UPDATE_POEM_SUCCESS, response.data));
      dispatch(createMessage({ poemUpdated: "Şiir düzenlendi." }));
    })
    .catch((err) => {
      dispatch(returnErrors({ message: err.response }));
    });
};
