import React, { useEffect } from "react";
import { useState } from "react";
import { allCharacters } from "../data/data";
import Navbar from "./components/Navbar";
import CharactersList from "./components/CharactersList";
import CharacterDetail from "./components/CharacterDetail";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState(allCharacters);
  const [isLoading, setIsLoading] = useState(false);

  // fetch with try,catch
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await axios.get(
  //         "https://rickandmortyapi.com/api/chardacter"
  //       );
  //       setCharacters(data.results.slice(0, 5));
  //     } catch (error) {
  //       toast.error(error.response.data.error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // fetch with axios
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(({ data }) => {
        setCharacters(data.results.slice(0, 5));
      })

      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <Toaster toastOptions={{ className: "toast" }} />
      <Navbar numOfResult={characters.length} />
      <Main>
        <CharactersList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
