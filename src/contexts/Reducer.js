import {
  ACTIVE_MODAL,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  EDIT_INGREDIENT,
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
    case ACTIVE_MODAL: 
      return {
          ...state,
          activeModal: payload,
      };
    case ADD_INGREDIENT: 
      return {
          ...state,
          ingredients: [...state.ingredients, payload],
      };
    case DELETE_INGREDIENT: 
      return {
          ...state,
          ingredients: state.ingredients.filter((ingredient) => ingredient.id !== payload),
      };
      case EDIT_INGREDIENT:
        return {
          ...state,
          ingredients: state.ingredients.map((item) =>
            item.id === payload.id ? { ...item, ...payload } : item
          ),
        };
    case GET_INGREDIENTS: 
      return {
          ...state,
          ingredients: payload,
      };
    case MODAL_TOGGLE: 
      return {
          ...state,
          modalDisplay: payload,
      };
    case NAVIGATE: 
      return {
          ...state,
          currentPage: payload,
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