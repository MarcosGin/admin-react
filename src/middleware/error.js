import { ERROR_LOGIN } from "../actions/types";

import { error } from "react-toastify-redux";

const errorMiddleware = ({ dispatch }) => next => action => {
  switch (action.type) {
    case ERROR_LOGIN:
      dispatch(error(action.payload.response));
      break;
    default:
      next(action);
      break;
  }
};

export default errorMiddleware;
