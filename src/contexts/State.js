import React, { useReducer } from "react";
import Reducer from "./Reducer";
import Context from "./ContextProvider";
import axios from "axios";

import {
  ADD_INGREDIENT,
  GET_INGREDIENTS,
  MODAL_TOGGLE,
  NAVIGATE,
  SORT_INGREDIENTS,
  SORT_TOGGLE
} from "./types";
const State = (props) => {
  const initialState = {
    active: 1,
    currentPage: 1,
    modalDisplay: false,
    ingredients: [],
    order: "asc"
  };
  const URL = "https://65341144e1b6f4c590468ad6.mockapi.io/salad-bar-api/";
  const [state, dispatch] = useReducer(Reducer, initialState);

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
        modalDisplay: state.modalDisplay,
        ingredients: state.ingredients,
        language: state.language,
        active: state.active,
        currentPage: state.currentPage,
        order: state.order,
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