import React, { useReducer } from "react";
import Reducer from "./Reducer";
import Context from "./ContextProvider";
import axios from "axios";

import {
  ACTIVE_MODAL,
  ADD_INGREDIENT,
  GET_INGREDIENTS,
  MODAL_TOGGLE,
  NAVIGATE,
  SORT_INGREDIENTS,
  SORT_TOGGLE
} from "./types";
const State = (props) => {
  const initialState = {
    activeModal: null,
    currentPage: 1,
    modalDisplay: false,
    ingredients: [],
    order: "asc"
  };
  const URL = "https://65341144e1b6f4c590468ad6.mockapi.io/salad-bar-api/";
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setActiveModal = (activeModal) => {
    dispatch({
      type: ACTIVE_MODAL,
      payload: activeModal
    });
  }

  const navigate = (item) => {
    dispatch({
      type: NAVIGATE,
      payload: item
    });
  };

  const modalToggle = (data) => {
    dispatch({
      type: MODAL_TOGGLE,
      payload: data,
    });
  };

  const getIngredients = async () => {
    let res = await axios.get(`${URL}ingredients`);
      dispatch({
        type: GET_INGREDIENTS,
        payload: res.data
      });
  };

  const sortIngredients = (ingredients, sortByColumn) => {
    if(!state.order) {
      state.order = "asc";
    }

    let newIngredientsArray = [];

    if(sortByColumn) {
      if(state.order === "asc") {
        newIngredientsArray = [...ingredients].sort((a, b) =>
          a[sortByColumn] > b[sortByColumn] ? 1 : -1,
        );
        sortToggle("desc");
      } else {
        newIngredientsArray = [...ingredients].sort((a, b) =>
          a[sortByColumn] > b[sortByColumn] ? -1 : 1,
        );
        sortToggle("asc");
      }
    }

    dispatch({
      type: SORT_INGREDIENTS,
      payload: newIngredientsArray
    });
  }

  const sortToggle = (data) => {
    console.log(data);
    dispatch({
      type: SORT_TOGGLE,
      payload: data,
    });
  };
  return (
    <Context.Provider
      value={{
        activeModal: state.activeModal,
        modalDisplay: state.modalDisplay,
        ingredients: state.ingredients,
        language: state.language,
        currentPage: state.currentPage,
        order: state.order,
        setActiveModal,
        navigate,
        getIngredients,
        modalToggle,
        sortIngredients,
        sortToggle
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default State;