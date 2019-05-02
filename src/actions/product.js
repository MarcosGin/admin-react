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
  CLEAR_MODAL,
  UPDATE_FILTERS
} from "./types";
import { apiAction } from "./api";

export const getProducts = ({ pagination, filters, sorter = null }) => {
  return (dispatch, getState) => {
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
        onFailure: error => {
          return { type: ERROR_ALL_PRODUCTS, payload: error };
        },
        label: GET_PRODUCTS
      })
    );
  };
};

export const addProduct = data => {
  return apiAction({
    url: "products/add",
    method: "POST",
    jwt: true,
    data,
    onSuccess: data => {
      return { type: CREATE_PRODUCT, payload: data };
    },
    onFailure: error => {
      return { type: ERROR_CREATE_PRODUCT, payload: error };
    },
    label: ADD_PRODUCT
  });
};

export const updateProduct = data => {
  return apiAction({
    url: `products/update/${data.id}`,
    method: "PUT",
    jwt: true,
    data,
    onSuccess: data => {
      return { type: UPDATE_PRODUCT, payload: data };
    },
    onFailure: error => {
      return { type: ERROR_UPDATE_PRODUCT, payload: error };
    },
    label: EDIT_PRODUCT
  });
};

export const deleteProduct = data => {
  return apiAction({
    url: `products/delete/${data.id}`,
    method: "DELETE",
    jwt: true,
    onSuccess: data => {
      return { type: DELETE_PRODUCT, payload: data };
    },
    onFailure: error => {
      return { type: ERROR_DELETE_PRODUCT, payload: error };
    },
    label: REMOVE_PRODUCT
  });
};

export const initUpdateForm = data => {
  return apiAction({
    url: `products/get/${data.id}`,
    method: "GET",
    jwt: true,
    onSuccess: data => {
      return { type: SET_INITIAL_UPDATE, payload: data };
    },
    onFailure: error => {
      return { type: ERROR_SET_INITIAL_UPDATE, payload: error };
    },
    label: GET_INITIAL_UPDATE
  });
};

export const setCurrentDelete = id => {
  return {
    type: SET_CURRENT_DELETE,
    payload: id
  };
};

export const clearModal = () => {
  return {
    type: CLEAR_MODAL,
    payload: {}
  };
};

export const updateFilters = (pagination, filters, sorter = null) => {
  return {
    type: UPDATE_FILTERS,
    payload: {
      pagination,
      filters,
      sorter
    }
  };
};
