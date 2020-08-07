import React, { useContext } from "react";
import { GameContext, SUBMIT_WORD } from "./GameContext";
var _ = require("lodash");

function SubmitButton() {
  const { state, dispatch } = useContext(GameContext);

  const handleClick = () => {
    const repeatedWord =
      state.words.find((word) => _.isEqual(word, state.list)) !== undefined;
    if (repeatedWord) {
      alert("You can not submit a repeated word...");
    } else {
      dispatch({
        type: SUBMIT_WORD,
      });
    }
  };

  return (
    <button disabled={state.list.length < 3} onClick={handleClick}>
      Submit
    </button>
  );
}

export default SubmitButton;
