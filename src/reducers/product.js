import {
  GET_PRODUCTS,
  API_START,
  API_END,
  ALL_PRODUCTS
} from "../actions/types";

const INITIAL_STATE = {
  isLoading: false,
  data: [],
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_PRODUCTS:
      return {
        ...state,
        data: action.payload.response
      };

    case API_START:
      if (action.payload === GET_PRODUCTS) {
        return {
          ...state,
          isLoading: true
        };
      } else {
        return state;
      }
    case API_END:
      if (action.payload === GET_PRODUCTS) {
        return {
          ...state,
          isLoading: false
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
