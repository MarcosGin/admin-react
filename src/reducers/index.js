import { combineReducers } from "redux";

import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import { toastsReducer as toasts } from "react-toastify-redux";

import authReducer from "./auth";
import productReducer from "./product";
import brandsReducer from "./brand";
import categoriesReducer from "./category";

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    products: productReducer,
    brands: brandsReducer,
    categories: categoriesReducer,
    toasts,
    form: formReducer
  });
