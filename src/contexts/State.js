import React, { useReducer } from "react";
import Reducer from "./Reducer";
import Context from "./ContextProvider";
import axios from "axios";

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
const State = (props) => {
  const initialState = {
    activeModal: null,
    currentPage: 1,
    ingredients: [],
    modalDisplay: false,
    order: "asc"
  };
  const URL = "https://65341144e1b6f4c590468ad6.mockapi.io/salad-bar-api/";
  const [state, dispatch] = useReducer(Reducer, initialState);

  const addIngredient = async (ingredient) => {
    let res = await axios.post(`${URL}ingredients/`, ingredient).then((response)=> {
      console.log(response);
    }).catch((err) => {
      console.error(err);
    });
    dispatch({
      type: ADD_INGREDIENT,
      payload: ingredient
    });
  }

  const deleteIngredient = async (id) => {
    let res = await axios.delete(`${URL}ingredients/${id}`);
    dispatch({
      type: DELETE_INGREDIENT,
      payload: id
    });
  }

  const editIngredient = async(ingredient) => {
    let res = await axios.put(`${URL}ingredients/${ingredient.id}`, ingredient).then((response)=> {
      console.log(response);
    }).catch((err) => {
      console.error(err);
    });
    
    dispatch({
      type: EDIT_INGREDIENT,
      payload: ingredient
    });
  }

  const getIngredients = async () => {
    let res = await axios.get(`${URL}ingredients`);
      dispatch({
        type: GET_INGREDIENTS,
        payload: res.data
      });
  };

  const modalToggle = (data) => {
    dispatch({
      type: MODAL_TOGGLE,
      payload: data,
    });
  };

  const navigate = (item) => {
    dispatch({
      type: NAVIGATE,
      payload: item
    });
  };

  const setActiveModal = (activeModal) => {
    dispatch({
      type: ACTIVE_MODAL,
      payload: activeModal
    });
  }

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
        currentPage: state.currentPage,
        ingredients: state.ingredients,
        modalDisplay: state.modalDisplay,
        order: state.order,
        addIngredient,
        deleteIngredient,
        editIngredient,
        getIngredients,
        modalToggle,
        navigate,
        setActiveModal,
        sortIngredients,
        sortToggle
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default State;