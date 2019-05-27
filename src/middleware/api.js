import axios from "axios";
import { API } from "../actions/types";
import { apiStart, apiError, apiEnd } from "../actions/api";
import { updateJwt, notification } from "../actions";
import { signOut } from "../actions";

const apiMiddleware = ({ dispatch, getState }) => next => action => {
  next(action);

  if (action.type !== API) return;

  const {
    url,
    method,
    data,
    jwt,
    onSuccess,
    onFailure,
    label
  } = action.payload;
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  //Set BASE URL
  axios.defaults.baseURL = "http://localhost:8080/api/";

  //Set Headers
  const headers = {};
  headers["Content-Type"] = "application/json";

  let userJwt = null;
  if (jwt) {
    userJwt = getState().auth.jwt;

    if(userJwt){
      headers["Authorization"] = `Bearer ${userJwt}`;
    }else{
      dispatch(signOut());
      dispatch(notification("error", "Session error", "Your session is invalid, relogin.", "session-destroy"));
      return;
    }
  }

  if (label) {
    dispatch(apiStart(label)); // Dispatch the start of request
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      dispatch(onSuccess(data));

      if (jwt && data.jwt && userJwt !== data.jwt) {
        dispatch(updateJwt(data.jwt));
      }
    })
    .catch(error => {
      dispatch(apiError(error));

      if (error.response) {

        if (error.response.status === 401) {
          dispatch(signOut());
          dispatch(notification("error", "Session error", error.response.data.response, "session-destroy"));
        }else{
          dispatch(onFailure(error.response.data));
        }
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
