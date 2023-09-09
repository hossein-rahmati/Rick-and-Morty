import { HeartIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";

function Navbar({ children }) {
  const [modalToggle, setModalToggle] = useState(false);

  const handleModalToggle = (status) => {
    setModalToggle(status);
  };

  return (
    <nav className="navbar">
      <Modal modalToggle={modalToggle} onModalToggle={handleModalToggle} />
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;

function Logo() {
  return <div className="navbar__logo">Logo 😍</div>;
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

export function Favorites({ numOfFavorites }) {
  return (
    <div className="heart" onClick={() => handleModalToggle(true)}>
      <HeartIcon className="icon" />
      <span className="badge">{numOfFavorites}</span>
    </div>
  );
}
