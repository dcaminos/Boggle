import React from "react";
import Board from "./Board";
import CurrentWord from "./CurrentWord";
import SubmitButton from "./SubmitButton";
import SubmittedWords from "./SubmittedWords";

function Layout() {
  return (
    <div className="layout">
      <Board></Board>
      <CurrentWord />
      <SubmitButton />
      <SubmittedWords />
    </div>
  );
}

export default Layout;
