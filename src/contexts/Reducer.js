import {
  ACTIVE_MODAL,
  ADD_INGREDIENT,
  ADD_SALAD,
  DELETE_INGREDIENT,
  EDIT_INGREDIENT,
  FILTER_SEARCH,
  FILTER_TOGGLE,
  GET_INGREDIENTS,
  GET_SALADS,
  MODAL_TOGGLE,
  NAVIGATE,
  SORT_INGREDIENTS,
  SORT_TOGGLE,
} from './types'

const ingredientReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIVE_MODAL:
      return {
        ...state,
        activeModal: payload,
      }
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, payload],
      }
    case ADD_SALAD:
      return {
        ...state,
        salads: [...state.salads, payload],
      }
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== payload,
        ),
      }
    case EDIT_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                ...payload,
              }
            : item,
        ),
      }
    case FILTER_TOGGLE:
      return {
        ...state,
        filters: payload,
      }
    case FILTER_SEARCH:
      return {
        ...state,
        searchText: payload,
      }
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: payload,
      }
    case GET_SALADS:
      return {
        ...state,
        salads: payload,
      }
    case MODAL_TOGGLE:
      return {
        ...state,
        modalDisplay: payload,
      }
    case NAVIGATE:
      return {
        ...state,
        currentPage: payload,
      }
    case SORT_INGREDIENTS:
      return {
        ...state,
        ingredients: payload,
      }
    case SORT_TOGGLE:
      return {
        ...state,
        order: payload,
      }
    default:
      return state
  }
}
export default ingredientReducer
