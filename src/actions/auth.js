import { SIGN_IN, LOGOUT, LOGIN, UPDATE_JWT, ERROR_LOGIN, CLEAR_REDIRECT } from "./types";
import { apiAction } from "./api";
import { notification} from "./notification";

export const signIn = (email, password) =>
  apiAction({
    url: "auth/login",
    method: "POST",
    data: { email, password },
    onSuccess: data => (dispatch, getState) => {
      dispatch({ type: LOGIN, payload: data });
    },
    onFailure: err => (dispatch, getState) => {
      dispatch({ type: ERROR_LOGIN, payload: err });
      dispatch(notification("error", "Login error", err.response));
    },
    label: SIGN_IN
  });

export const signOut = () => {
  return {
    type: LOGOUT,
    payload: {}
  };
};
export const updateJwt = jwt => {
  return {
    type: UPDATE_JWT,
    payload: jwt
  };
};
export const clearRedirect = () => {
  return {
    type: CLEAR_REDIRECT,
    payload: {}
  }
}