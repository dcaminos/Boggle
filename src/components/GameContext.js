import React, { createContext, useEffect, useReducer } from "react";
import { createBoard, resolveClick, resolveSubmit } from "../helper";

const URL =
  "https://raw.githubusercontent.com/adambom/dictionary/master/dictionary.json";

//Actions
export const START_GAME = "START_GAME";
export const CLICK_TILE = "CLICK_TILE";
export const SUBMIT_WORD = "SUBMIT_WORD";
export const SET_DICTIONARY = "SET_DICTIONARY";
export const UPDATE_TIME = "UPDATE_TIME";
export const FINISH_GAME = "FINISH_GAME";
export const SUBMIT_SCORE = "SUBMIT_SCORE";

export const GameStatus = {
  WAITING: "WAITING",
  PLAYING: "PLAYING",
  FINISHED: "FINISHED",
  SCORES: "SCORES",
};

const TOTAL_TIME = 5;

//Initial State
const initialState = {
  status: GameStatus.WAITING,
  board: [],
  list: [],
  words: [],
  lastSelected: null,
  dictionary: [],
  score: 0,
  time: -1,
  scores: [],
};

//Reducer
function reducer(state, action) {
  switch (action.type) {
    case SET_DICTIONARY:
      return {
        ...state,
        dictionary: action.payload,
      };
    case START_GAME:
      return {
        ...state,
        status: GameStatus.PLAYING,
        board: createBoard(),
        score: 0,
        time: TOTAL_TIME,
      };
    case CLICK_TILE:
      return resolveClick(state, action.payload);
    case SUBMIT_WORD:
      return resolveSubmit(state);
    case UPDATE_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case FINISH_GAME:
      return {
        ...state,
        status: GameStatus.FINISHED,
        time: initialState.time,
      };
    case SUBMIT_SCORE:
      const newScores = [...state.scores];
      newScores.push(action.payload);
      return {
        ...state,
        scores: newScores,
        status: GameStatus.SCORES,
      };
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
          type: SET_DICTIONARY,
          payload: Object.keys(data),
        });
      });
  }, []);

  useEffect(() => {
    if (state.time > 0) {
      setTimeout(() => {
        dispatch({
          type: UPDATE_TIME,
          payload: state.time - 1,
        });
      }, 1000);
    } else if (state.time === 0) {
      dispatch({ type: FINISH_GAME });
    }
  }, [state.time]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
