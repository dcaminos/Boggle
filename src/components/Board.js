import React, { useContext } from "react";
import { GameContext } from "./GameContext";
import Tile from "./Tile";

function Board() {
  const { state, dispatch } = useContext(GameContext);

  const renderRow = (row, y) => {
    return (
      <div key={`${y}`} className="row">
        {state.board[y].map((value, x) => {
          return <Tile key={`${x}${y}`} value={value} x={x} y={y} />;
        })}
      </div>
    );
  };

  return <div className="board">{state.board.map(renderRow)}</div>;
}

export default Board;
