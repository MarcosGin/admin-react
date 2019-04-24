import { ALL_BRANDS, ERROR_ALL_BRANDS, GET_BRANDS } from "./types";
import { apiAction } from "./api";

export const getBrands = (filters = []) => {
  return apiAction({
    url: "products/marks/list",
    method: "GET",
    jwt: true,
    data: { filters },
    onSuccess: data => {
      return { type: ALL_BRANDS, payload: data };
    },
    onFailure: error => {
      return { type: ERROR_ALL_BRANDS, payload: error };
    },
    label: GET_BRANDS
  });
};
