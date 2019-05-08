import {
  GET_PRODUCTS,
  ALL_PRODUCTS,
  ERROR_ALL_PRODUCTS,
  ADD_PRODUCT,
  CREATE_PRODUCT,
  ERROR_CREATE_PRODUCT,
  EDIT_PRODUCT,
  UPDATE_PRODUCT,
  ERROR_UPDATE_PRODUCT,
  SET_INITIAL_UPDATE,
  ERROR_SET_INITIAL_UPDATE,
  GET_INITIAL_UPDATE,
  REMOVE_PRODUCT,
  DELETE_PRODUCT,
  ERROR_DELETE_PRODUCT,
  SET_CURRENT_DELETE,
  GET_PRODUCT,
  SET_PRODUCT,
  ERROR_SET_PRODUCT,
  CLEAR_MODAL,
  CLEAR_DRAWER,
  UPDATE_FILTERS,
  NOTIFICATION
} from "./types";
import { apiAction } from "./api";
import { notification } from "./notification";

export const getProducts = ({ pagination, filters, sorter = null }) => (
  dispatch,
  getState
) => {
  let data = { page: pagination.current, limit: pagination.pageSize };

  if (sorter) {
    data.sorter = sorter;
  }

  if (filters) {
    data = { ...data, ...filters };
  }

  dispatch(updateFilters(pagination, filters, sorter));

  dispatch(
    apiAction({
      url: "products/list",
      method: "GET",
      jwt: true,
      data,
      onSuccess: data => {
        return { type: ALL_PRODUCTS, payload: data };
      },
      onFailure: err => (dispatch, getState) => {
        dispatch({ type: ERROR_ALL_PRODUCTS, payload: err });
        dispatch(notification("warning", "Not found products", err.response));
      },
      label: GET_PRODUCTS
    })
  );
};

export const addProduct = data =>
  apiAction({
    url: "products/add",
    method: "POST",
    jwt: true,
    data,
    onSuccess: data => (dispatch, getState) => {
      dispatch({ type: CREATE_PRODUCT, payload: data });
      dispatch(
        notification("success", "Create product", data.response.message)
      );
    },
    onFailure: err => (dispatch, getState) => {
      dispatch({ type: ERROR_CREATE_PRODUCT, payload: err });
      dispatch(notification("error", "Create product", err.response));
    },
    label: ADD_PRODUCT
  });

export const updateProduct = data =>
  apiAction({
    url: `products/update/${data.id}`,
    method: "PUT",
    jwt: true,
    data,
    onSuccess: data => (dispatch, getState) => {
      dispatch({ type: UPDATE_PRODUCT, payload: data });
      dispatch(
        notification("success", "Update product", data.response.message)
      );
    },
    onFailure: err => (dispatch, getState) => {
      dispatch({ type: ERROR_UPDATE_PRODUCT, payload: err });
      dispatch(notification("error", "Update product", err.response));
    },
    label: EDIT_PRODUCT
  });

export const deleteProduct = data =>
  apiAction({
    url: `products/delete/${data.id}`,
    method: "DELETE",
    jwt: true,
    onSuccess: data => (dispatch, getState) => {
      dispatch({ type: DELETE_PRODUCT, payload: data });
      dispatch(
        notification("success", "Delete product", data.response.message)
      );
    },
    onFailure: err => (dispatch, getState) => {
      dispatch({ type: ERROR_DELETE_PRODUCT, payload: err });
      dispatch(notification("error", "Delete product", err.response));
    },
    label: REMOVE_PRODUCT
  });

export const initUpdateForm = data =>
  apiAction({
    url: `products/get/${data.id}`,
    method: "GET",
    jwt: true,
    onSuccess: data => ({ type: SET_INITIAL_UPDATE, payload: data }),
    onFailure: err => (dispatch, getState) => {
      dispatch({ type: ERROR_SET_INITIAL_UPDATE, payload: err });
      dispatch(notification("error", "Editing product", err.response));
    },
    label: GET_INITIAL_UPDATE
  });

export const getProduct = data =>
  apiAction({
    url: `products/get/${data.id}`,
    method: "GET",
    jwt: true,
    onSuccess: data => ({ type: SET_PRODUCT, payload: data }),
    onFailure: err => (dispatch, getState) => {
      dispatch({ type: ERROR_SET_PRODUCT, payload: err });
      dispatch(notification("error", "Get product", err.response));
    },
    label: GET_PRODUCT
  });

export const setCurrentDelete = id => ({
  type: SET_CURRENT_DELETE,
  payload: id
});

export const setUpdateForm = data => ({
  type: SET_INITIAL_UPDATE,
  payload: { response: data }
});

export const reloadViewProduct = () => (dispatch, getState) => {
  const data = getState().products.view.current;
  dispatch(getProduct(data));
};

export const clearModal = () => ({ type: CLEAR_MODAL, payload: {} });

export const clearDrawer = () => ({ type: CLEAR_DRAWER, payload: {} });

export const updateFilters = (pagination, filters, sorter = null) => ({
  type: UPDATE_FILTERS,
  payload: {
    pagination,
    filters,
    sorter
  }
});
