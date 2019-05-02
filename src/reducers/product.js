import {
  GET_PRODUCTS,
  API_START,
  API_END,
  ALL_PRODUCTS,
  ADD_PRODUCT,
  CREATE_PRODUCT,
  ERROR_CREATE_PRODUCT,
  CLEAR_MODAL,
  UPDATE_FILTERS,
  EDIT_PRODUCT,
  UPDATE_PRODUCT,
  ERROR_UPDATE_PRODUCT,
  SET_INITIAL_UPDATE,
  GET_INITIAL_UPDATE,
  REMOVE_PRODUCT,
  DELETE_PRODUCT,
  SET_CURRENT_DELETE,
  ERROR_DELETE_PRODUCT
} from "../actions/types";

const INITIAL_STATE = {
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  data: [],
  error: null,
  created: null,
  createErrors: [],
  edit: {
    data: null,
    loading: false
  },
  remove: {
    status: null,
    current: null,
    loading: false
  },
  updated: null,
  updateErrors: [],
  filters: {}
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

    case UPDATE_PRODUCT:
      return {
        ...state,
        updated: true,
        updateErrors: []
      };

    case ERROR_UPDATE_PRODUCT:
      return {
        ...state,
        updated: false,
        updateErrors: action.payload.response
      };

    case SET_INITIAL_UPDATE:
      return {
        ...state,
        edit: { ...state.edit, data: action.payload.response }
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: true
        }
      };

    case ERROR_DELETE_PRODUCT:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: false
        }
      };

    case SET_CURRENT_DELETE:
      return {
        ...state,
        remove: {
          ...state.remove,
          current: action.payload
        }
      };

    case CLEAR_MODAL:
      return {
        ...state,
        created: null,
        isCreating: false,
        createErrors: [],
        updated: null,
        isUpdating: false,
        updateErrors: [],
        edit: { data: null, loading: false }
      };

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload
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
        case EDIT_PRODUCT:
          return {
            ...state,
            isUpdating: true
          };
        case GET_INITIAL_UPDATE:
          return {
            ...state,
            edit: {
              ...state.edit,
              loading: true
            }
          };
        case REMOVE_PRODUCT:
          return {
            ...state,
            remove: {
              ...state.remove,
              loading: true
            }
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
        case EDIT_PRODUCT:
          return {
            ...state,
            isUpdating: false
          };
        case GET_INITIAL_UPDATE:
          return {
            ...state,
            edit: { ...state.edit, loading: false }
          };
        case REMOVE_PRODUCT:
          return {
            ...state,
            remove: {
              ...state.remove,
              loading: false
            }
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
