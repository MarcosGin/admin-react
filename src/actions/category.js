import { ALL_CATEGORIES, ERROR_ALL_CATEGORIES, GET_CATEGORIES } from "./types";
import { apiAction } from "./api";

export const getCategories = (filters = []) => {
  return apiAction({
    url: "categories",
    method: "GET",
    jwt: true,
    data: { filters },
    onSuccess: data => {
      return { type: ALL_CATEGORIES, payload: data };
    },
    onFailure: error => {
      return { type: ERROR_ALL_CATEGORIES, payload: error };
    },
    label: GET_CATEGORIES
  });
};
