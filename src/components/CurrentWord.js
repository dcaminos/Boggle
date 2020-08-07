import React, { useContext } from "react";
import { GameContext } from "./GameContext";
import Word from "./Word";

function CurrentWord() {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div>
      Curent Word:
      <Word word={state.list} />
    </div>
  );
}

export default CurrentWord;
