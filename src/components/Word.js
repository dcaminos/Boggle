import React, { useContext } from "react";
import { GameContext } from "./GameContext";

function Word({ word }) {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div>
      {word.map((leterIndex, index) => (
        <span key={`${index}`}>{state.board[leterIndex.y][leterIndex.x]}</span>
      ))}
    </div>
  );
}

export default Word;
