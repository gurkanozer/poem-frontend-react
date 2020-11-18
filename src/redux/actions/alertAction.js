import { CREATE_MESSAGE, GET_ERRORS } from "./actionTypes";

//CREATE_MESSAGE
export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

//RETURN ERRORS
export const returnErrors = (error) => {
  return {
    type: GET_ERRORS,
    payload: error.message,
  };
};
//SHOW MESSAGE

export function showMessage(msg) {
  return function (dispatch) {
    dispatch({ type: CREATE_MESSAGE, payload: msg });
  };
}
