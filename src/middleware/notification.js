import { NOTIFICATION } from "../actions/types";
import { notification } from "antd";

const errorMiddleware = ({ dispatch }) => next => action => {
  switch (action.type) {
    case NOTIFICATION:
      notification[action.payload.type]({
        key: action.payload.key ? action.payload.key : null,
        message: action.payload.title,
        description: action.payload.content,
        style: {
          width: 600,
          marginLeft: 335 - 600
        }
      });
      next(action);
      break;
    default:
      next(action);
      break;
  }
};

export default errorMiddleware;
