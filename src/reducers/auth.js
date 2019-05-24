import {
  API_START,
  SIGN_IN,
  API_END,
  LOGIN,
  ERROR_LOGIN,
  LOGOUT,
  UPDATE_JWT
} from "../actions/types";
import jwt_decode from "jwt-decode";

const userJwt = localStorage.getItem("jwt");

const getUserData = jwt => {
  let userData = null;
  try {
    userData = jwt_decode(jwt);
  } catch (e) {
    console.log(jwt);
    console.log(e);
  }
  return userData;
};

const INITIAL_STATE = {
  isSignedIn: userJwt ? true : null,
  user: getUserData(userJwt),
  jwt: userJwt ? userJwt : null,
  isLoading: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isSignedIn: action.payload.status,
        user: getUserData(action.payload.jwt),
        jwt: action.payload.jwt,
        error: null,
        redirectTo: "/"
      };
    case ERROR_LOGIN:
      return {
        ...state,
        error: action.payload.response
      };
    case LOGOUT:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        jwt: null,
        error: null,
        redirectTo: "/"
      };
    case UPDATE_JWT:
      return {
        ...state,
        user: getUserData(action.payload),
        jwt: action.payload
      };
    case API_START:
      if (action.payload === SIGN_IN) {
        return {
          ...state,
          isLoading: true
        };
      } else {
        return state;
      }
    case API_END:
      if (action.payload === SIGN_IN) {
        return {
          ...state,
          isLoading: false
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
