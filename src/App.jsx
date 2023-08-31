import React from "react";
import Navbar from "./components/Navbar";
import CharactersList from "./components/CharactersList";
import CharacterDetail from "./components/CharacterDetail";
import { allCharacters } from "../data/data";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharactersList allCharacters={allCharacters} />
        <CharacterDetail />
      </div>
    </div>
  );
}

export default App;
