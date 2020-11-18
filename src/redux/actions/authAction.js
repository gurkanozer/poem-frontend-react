import axios from "axios";
import { setConfig } from "../../helpers/helpers";
import { createMessage, returnErrors } from "./alertAction";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  // GET_ERRORS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_UPDATED,
} from "./actionTypes";

//CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });
  const config = setConfig(getState);
  axios
    .get("/user", config)
    .then((response) => {
      if (response.data.user === null) dispatch({ type: AUTH_ERROR });
      else dispatch({ type: USER_LOADED, payload: response.data });
    })
    .catch((err) => {
      //   dispatch({
      //     type: GET_ERRORS,
      //     payload: err,
      //   });
      dispatch({ type: AUTH_ERROR });
    });
};
//UPDATE USER
export const updateUser = (data) => (dispatch, getState) => {
  const config = setConfig(getState);
  axios.put("/user", data, config).then((response) => {
    dispatch({ type: USER_UPDATED, payload: response.data });
  });
};
//LOGIN USER
export const login = (email, password) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Request Body
  const data = JSON.stringify({ email, password });
  axios
    .post("/login", data, config)
    .then((response) => {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
      dispatch({ type: LOGIN_FAIL });
    });
};

//LOGOUT
export const logout = () => (dispatch, getState) => {
  //Get token from state
  const token = getState().auth.token;
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `bearer ${token}`;
  }
  axios
    .post("/logout", null, config)
    .then((response) => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      //   dispatch({
      //     type: GET_ERRORS,
      //     payload: err,
      //   });
    });
};

//REGISTER
export const register = (user) => (dispatch) => {
  console.log("User Data: ", user);
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify(user);
  console.log("Data: ", data);
  axios
    .post("/register", data, config)
    .then((response) => {
      dispatch(createMessage({ userAdded: "Hesap oluşturuldu." }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
      dispatch(returnErrors({ message: "User_Created_Fail" }));
    });
};
