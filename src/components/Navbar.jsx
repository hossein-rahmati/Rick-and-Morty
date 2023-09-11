import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Character } from "./CharactersList";
import Modal from "./Modal";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;

function Logo() {
  return (
    <div>
      <img className="navbar__logo" src="../../public/logo.png" alt="logo" />
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="text-field"
        placeholder="search..."
      />
    </div>
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function Favorites({ favorites, onDeleteFavorite }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal modalToggle={isOpen} onModalToggle={setIsOpen} title="list of favorites">
        {favorites.map((f) => {
          return (
            <Character key={f.id} character={f}>
              <button onClick={() => onDeleteFavorite(f.id)} className="icon red">
                <TrashIcon />
              </button>
            </Character>
          );
        })}
      </Modal>
      <div style={{ display: isOpen ? "none" : "block" }} className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </div>
    </>
  );
}
