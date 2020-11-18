import * as actionTypes from "../actions/actionTypes";
import { initialState } from "../initialState";

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.USER_LOADED:
    case actionTypes.USER_UPDATED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.USER_CREATED_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
