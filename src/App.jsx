import React, { useEffect } from "react";
import { useState } from "react";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import CharactersList from "./components/CharactersList";
import CharacterDetail from "./components/CharacterDetail";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character?name=${query}`)
      .then(({ data }) => {
        setCharacters(data.results.slice(0, 5));
      })
      .catch((error) => {
        toast.error(error.response.data.error, { id: 1 });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavorite = (character) => {
    setFavorites((prevFav) => [...prevFav, character]);
    toast.success(`"${character.name}" Added to favorites`);
  };

  const isExistInFavorites = favorites
    .map((fav) => fav.id)
    .includes(selectedId);

  return (
    <div className="app">
      <Toaster toastOptions={{ className: "toast" }} />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorites numOfFavorites={favorites.length} />
      </Navbar>
      <Main>
        <CharactersList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={handleAddFavorite}
          isExistInFavorites={isExistInFavorites}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
