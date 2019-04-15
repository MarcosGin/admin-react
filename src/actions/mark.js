import { ALL_MARKS, ERROR_ALL_MARKS, GET_MARKS } from "./types";
import { apiAction } from "./api";

export const getMarks = (filters = []) => {
  return apiAction({
    url: "products/marks/list",
    method: "GET",
    jwt: true,
    data: { filters },
    onSuccess: data => {
      return { type: ALL_MARKS, payload: data };
    },
    onFailure: error => {
      return { type: ERROR_ALL_MARKS, payload: error };
    },
    label: GET_MARKS
  });
};
