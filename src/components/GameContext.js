import React, { createContext, useEffect, useReducer } from "react";
import { createBoard, resolveClick, resolveSubmit } from "../helper";

const URL =
  "https://raw.githubusercontent.com/adambom/dictionary/master/dictionary.json";

//Actions
export const START_GAME = "START_GAME";
export const CLICK_TILE = "CLICK_TILE";
export const SUBMIT_WORD = "SUBMIT_WORD";

//Initial State
const initialState = {
  board: [],
  list: [],
  words: [],
  lastSelected: null,
  dictionary: [],
  score: 0,
};

//Reducer
function reducer(state, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        board: createBoard(),
        dictionary: action.payload,
        score: 0,
      };

    case CLICK_TILE:
      return resolveClick(state, action.payload);
    case SUBMIT_WORD:
      return resolveSubmit(state);
    default:
      return state;
  }
}

export const GameContext = createContext();
function GameContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: START_GAME,
          payload: Object.keys(data),
        });
      });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
