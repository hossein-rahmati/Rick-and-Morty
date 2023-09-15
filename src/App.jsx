import React, { useEffect } from "react";
import { useState } from "react";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import CharactersList from "./components/CharactersList";
import CharacterDetail from "./components/CharacterDetail";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import useCharacters from "./hooks/useCharacters";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("FAVORITES")) || []
  );
  const isExistInFavorites = favorites
    .map((fav) => fav.id)
    .includes(selectedId);

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorites));
  }, [favorites]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavorite = (character) => {
    setFavorites((prevFav) => [...prevFav, character]);
    toast.success(`"${character.name}" Added to favorites`);
  };

  const handleDeleteFavorite = (id) => {
    setFavorites((prevFav) => prevFav.filter((f) => f.id !== id));
    toast.success("Item removed successfully from favorites");
  };

  return (
    <div className="app">
      <Toaster toastOptions={{ className: "toast" }} />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorites
          favorites={favorites}
          onDeleteFavorite={handleDeleteFavorite}
        />
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
