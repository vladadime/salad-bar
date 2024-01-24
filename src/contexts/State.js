import React, { useReducer } from 'react'
import Reducer from './Reducer'
import Context from './ContextProvider'
import axios from 'axios'

import {
  ACTIVE_MODAL,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  EDIT_INGREDIENT,
  FILTER_SEARCH,
  FILTER_TOGGLE,
  GET_INGREDIENTS,
  MODAL_TOGGLE,
  NAVIGATE,
  SORT_INGREDIENTS,
  SORT_TOGGLE,
} from './types'
const State = (props) => {
  const initialState = {
    activeModal: null,
    currentPage: 1,
    filters: [],
    ingredients: [],
    modalDisplay: false,
    order: 'asc',
    salads: [],
    searchText: '',
  }
  const URL = 'https://65341144e1b6f4c590468ad6.mockapi.io/salad-bar-api/'
  const [state, dispatch] = useReducer(Reducer, initialState)

  const addIngredient = async (ingredient) => {
    let res = await axios
      .post(`${URL}ingredients/`, ingredient)
      .then((response) => {
        if (response) {
          if (response.data) {
            dispatch({ type: ADD_INGREDIENT, payload: response.data })
          }
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const deleteIngredient = async (id) => {
    let res = await axios
      .delete(`${URL}ingredients/${id}`)
      .then((response) => {
        dispatch({ type: DELETE_INGREDIENT, payload: id })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const editIngredient = async (ingredient) => {
    let res = await axios
      .put(`${URL}ingredients/${ingredient.id}`, ingredient)
      .then((response) => {
        if (response) {
          if (response.data) {
            dispatch({ type: EDIT_INGREDIENT, payload: response.data })
          }
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const getIngredients = async () => {
    let res = await axios
      .get(`${URL}ingredients`)
      .then((response) => {
        if (response) {
          if (response.data) {
            dispatch({ type: GET_INGREDIENTS, payload: response.data })
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const modalToggle = (data) => {
    dispatch({ type: MODAL_TOGGLE, payload: data })
  }

  const navigate = (item) => {
    if (typeof item === 'number') {
      dispatch({ type: NAVIGATE, payload: item })
    }
  }

  const setActiveModal = (activeModal) => {
    dispatch({ type: ACTIVE_MODAL, payload: activeModal })
  }

  const sortIngredients = (ingredients, sortByColumn) => {
    if (!state.order) {
      state.order = 'asc'
    }

    let newIngredientsArray = []

    if (sortByColumn) {
      if (state.order === 'asc') {
        newIngredientsArray = [...ingredients].sort((a, b) =>
          a[sortByColumn] > b[sortByColumn] ? 1 : -1,
        )
        sortToggle('desc')
      } else {
        newIngredientsArray = [...ingredients].sort((a, b) =>
          a[sortByColumn] > b[sortByColumn] ? -1 : 1,
        )
        sortToggle('asc')
      }
    }

    dispatch({ type: SORT_INGREDIENTS, payload: newIngredientsArray })
  }

  const filterToggle = (event) => {
    const filter = event.target.value
    let newFilters = state.filters
    if (state.filters.includes(filter)) {
      newFilters = state.filters.filter((item) => item !== filter)
    } else {
      newFilters.push(filter)
    }
    if (newFilters.length > 0) {
      navigate(1)
    }
    dispatch({ type: FILTER_TOGGLE, payload: newFilters })
  }

  const filterSearch = (event) => {
    if (event.target.value.length > 0) {
      navigate(1)
    }
    dispatch({ type: FILTER_SEARCH, payload: event.target.value })
  }

  const sortToggle = (data) => {
    dispatch({ type: SORT_TOGGLE, payload: data })
  }

  return (
    <Context.Provider
      value={{
        activeModal: state.activeModal,
        currentPage: state.currentPage,
        filters: state.filters,
        ingredients: state.ingredients,
        modalDisplay: state.modalDisplay,
        order: state.order,
        salads: state.salads,
        searchText: state.searchText,
        addIngredient,
        deleteIngredient,
        editIngredient,
        filterSearch,
        filterToggle,
        getIngredients,
        modalToggle,
        navigate,
        setActiveModal,
        sortIngredients,
        sortToggle,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
export default State
