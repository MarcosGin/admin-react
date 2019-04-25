import {
  GET_PRODUCTS,
  API_START,
  API_END,
  ALL_PRODUCTS,
  ADD_PRODUCT,
  CREATE_PRODUCT,
  ERROR_CREATE_PRODUCT,
  CLEAR_MODAL
} from "../actions/types";

const INITIAL_STATE = {
  isLoading: false,
  isCreating: false,
  data: [],
  error: null,
  created: null,
  createErrors: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_PRODUCTS:
      return {
        ...state,
        data: action.payload.response
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        created: true,
        createErrors: []
      };

    case ERROR_CREATE_PRODUCT:
      return {
        ...state,
        created: false,
        createErrors: action.payload.response
      };

    case CLEAR_MODAL:
      return {
        ...state,
        created: null,
        isCreating: false,
        createErrors: []
      };

    case API_START:
      switch (action.payload) {
        case GET_PRODUCTS:
          return {
            ...state,
            isLoading: true
          };
        case ADD_PRODUCT:
          return {
            ...state,
            isCreating: true
          };
        default:
          return state;
      }
    case API_END:
      switch (action.payload) {
        case GET_PRODUCTS:
          return {
            ...state,
            isLoading: false
          };
        case ADD_PRODUCT:
          return {
            ...state,
            isCreating: false
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
