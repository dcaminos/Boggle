import React, { useContext } from "react";
import { CLICK_TILE, GameContext } from "./GameContext";

function Tile({ value, x, y }) {
  const { state, dispatch } = useContext(GameContext);

  const handleClick = () => {
    dispatch({
      type: CLICK_TILE,
      payload: {
        x: x,
        y: y,
      },
    });
  };

  let isLastSelected = false;
  if (state.lastSelected !== null) {
    isLastSelected = x === state.lastSelected.x && y === state.lastSelected.y;
  }

  let isSelected = state.list.find((e) => e.x === x && e.y === y) !== undefined;

  return (
    <div
      className={`tile ${isSelected ? "selected" : ""} ${
        isLastSelected ? "last-selected" : ""
      }`}
      onClick={handleClick}
    >
      {value}
    </div>
  );
}

export default Tile;
