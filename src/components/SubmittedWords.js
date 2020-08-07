import React, { useContext } from "react";
import { GameContext } from "./GameContext";

function SubmittedWord() {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div>
      <div>
        Submitted Words:
        {state.words.map((submitted, index) => (
          <div key={`${index}`}>
            <span>{submitted.word}</span>
            <strong>{submitted.score}</strong>
          </div>
        ))}
      </div>
      <div>Total Score: {state.score}</div>
    </div>
  );
}

export default SubmittedWord;
