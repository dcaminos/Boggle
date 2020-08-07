import React, { useContext } from "react";
import { GameContext } from "./GameContext";

function Timer() {
  const { state, dispatch } = useContext(GameContext);

  return <div className="timer">{state.time}</div>;
}

export default Timer;
