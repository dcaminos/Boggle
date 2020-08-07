import React from "react";
import "./App.css";
import GameContextProvider from "./components/GameContext";
import Layout from "./components/Layout";

function App() {
  return (
    <GameContextProvider>
      <Layout />
    </GameContextProvider>
  );
}

export default App;
