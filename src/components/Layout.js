import React, { useContext, useState } from "react";
import Board from "./Board";
import CurrentWord from "./CurrentWord";
import {
  GameContext,
  GameStatus,
  START_GAME,
  SUBMIT_SCORE,
} from "./GameContext";
import ScoreTable from "./ScoreTable";
import SubmitButton from "./SubmitButton";
import SubmittedWords from "./SubmittedWords";
import Timer from "./Timer";

function Layout() {
  const { state, dispatch } = useContext(GameContext);
  const [name, setName] = useState("");

  if (state.status === GameStatus.WAITING) {
    return (
      <button
        onClick={() => {
          dispatch({
            type: START_GAME,
          });
        }}
      >
        START GAME
      </button>
    );
  }

  if (state.status === GameStatus.FINISHED) {
    return (
      <div>
        <div>Your score was: {state.score}</div>
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <button
            disabled={name.length < 3}
            onClick={() => {
              dispatch({
                type: SUBMIT_SCORE,
                payload: {
                  name,
                  points: state.score,
                },
              });
            }}
          >
            SUBMIT YOUR SCORE
          </button>
        </div>
      </div>
    );
  }

  if (state.status === GameStatus.SCORES) {
    return (
      <div>
        <ScoreTable />

        <button
          onClick={() => {
            dispatch({
              type: START_GAME,
            });
          }}
        >
          PLAY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="layout">
      <h1>Boggle</h1>
      <Timer />
      <Board />
      <CurrentWord />
      <SubmitButton />
      <SubmittedWords />
    </div>
  );
}

export default Layout;
