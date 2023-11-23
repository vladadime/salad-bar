import React, { useReducer } from "react";
import Reducer from "./Reducer";
import Context from "./ContextProvider";
import axios from "axios";

import {
  NAVIGATE,
  GET_INGREDIENTS,
} from "./types";
const State = (props) => {
  const initialState = {
    active: 1,
    currentPage: 1,
    modalDisplay: false,
    ingredients: [],
    language: "cir",
  };
  const URL = "https://65341144e1b6f4c590468ad6.mockapi.io/salad-bar-api/";
  const [state, dispatch] = useReducer(Reducer, initialState);

  const navigate = (item) => {
    dispatch({
      type: NAVIGATE,
      payload: item
    });
  };

  const getIngredients = async () => {
    let res = await axios.get(`${URL}ingredients`);
      dispatch({
        type: GET_INGREDIENTS,
        payload: res.data
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
        navigate,
        getIngredients
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default State;