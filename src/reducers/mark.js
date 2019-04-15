import { GET_MARKS, ALL_MARKS, API_START, API_END } from "../actions/types";

const INITIAL_STATE = {
  isLoading: false,
  data: [],
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_MARKS:
      return {
        ...state,
        data: action.payload.response
      };

    case API_START:
      if (action.payload === GET_MARKS) {
        return {
          ...state,
          isLoading: true
        };
      } else {
        return state;
      }
    case API_END:
      if (action.payload === GET_MARKS) {
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
