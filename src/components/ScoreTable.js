import React, { useContext } from "react";
import { GameContext } from "./GameContext";

function ScoreTable() {
  const { state, dispatch } = useContext(GameContext);

  const renderScore = (score, index) => {
    return (
      <tr key={`${index}`}>
        <td> {score.name}</td>
        <td> {score.points}</td>
      </tr>
    );
  };

  const sortScore = (a, b) => {
    return b.points - a.points;
  };

  return (
    <div>
      <h1>Scores:</h1>
      <table>
        <thead>
          <tr>
            <th key="name">Name</th>
            <th key="score">Score</th>
          </tr>
        </thead>
        <tbody>{state.scores.sort(sortScore).map(renderScore)}</tbody>
      </table>
    </div>
  );
}

export default ScoreTable;
