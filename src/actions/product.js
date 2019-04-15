import { GET_PRODUCTS, ALL_PRODUCTS, ERROR_ALL_PRODUCTS } from "./types";
import { apiAction } from "./api";

export const getProducts = ({ pagination, filters, sorter = null }) => {
  let data = { page: pagination.current, limit: pagination.pageSize };

  if (sorter) {
    data.sorter = sorter;
  }

  if (filters) {
    data = { ...data, ...filters };
  }

  return apiAction({
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
  });
};
