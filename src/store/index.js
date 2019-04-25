import { createStore, compose, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import reducers from "../reducers";
import apiMiddleware from "../middleware/api";
import localStorageMiddleware from "../middleware/localStorage";
import errorMiddleware from "../middleware/error";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers(history),
  composeEnhancers(
    applyMiddleware(
      apiMiddleware,
      localStorageMiddleware,
      errorMiddleware,
      thunk,
      routerMiddleware(history)
    )
  )
);
