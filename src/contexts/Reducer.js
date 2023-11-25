import {
  NAVIGATE,
  GET_INGREDIENTS,
  ADD_INGREDIENT,
  MODAL_TOGGLE
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
    case MODAL_TOGGLE: 
      return {
          ...state,
          modalDisplay: payload,
      };
    case GET_INGREDIENTS: 
      return {
          ...state,
          ingredients: payload,
      };
    case ADD_INGREDIENT: 
      return {
          ...state,
          ingredient: payload,
      };
    default:
      return state;
  }
}
export default ingredientReducer;