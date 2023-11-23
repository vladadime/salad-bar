import {
  NAVIGATE,
  GET_INGREDIENTS,
} from "./types";

const ingredientReducer = (state, {
  type,
  payload
}) => {
  switch (type) {
    case NAVIGATE: 
      return {
          ...state,
          currentPage: payload,
      };
    case GET_INGREDIENTS: 
      return {
          ...state,
          ingredients: payload,
      };
    default:
      return state;
  }
}
export default ingredientReducer;