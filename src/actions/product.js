import {
  GET_PRODUCTS,
  ALL_PRODUCTS,
  ERROR_ALL_PRODUCTS,
  ADD_PRODUCT,
  CREATE_PRODUCT,
  ERROR_CREATE_PRODUCT,
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
