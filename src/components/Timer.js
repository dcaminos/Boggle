import React, { useContext } from "react";
import { formatTime } from "../helper";
import { GameContext } from "./GameContext";

function Timer() {
  const { state, dispatch } = useContext(GameContext);

  return <div className="timer">{formatTime(state.time)}</div>;
}

export default Timer;
