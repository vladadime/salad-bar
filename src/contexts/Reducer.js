import {
  ADD_INGREDIENT,
  GET_INGREDIENTS,
  MODAL_TOGGLE,
  NAVIGATE,
  SORT_INGREDIENTS,
  SORT_TOGGLE
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
    case SORT_INGREDIENTS:
      return {
          ...state,
          ingredients: payload,
      };
    case SORT_TOGGLE: 
      return {
        ...state,
        order: payload,
      }
    default:
      return state;
  }
}
export default ingredientReducer;