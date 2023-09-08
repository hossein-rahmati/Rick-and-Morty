import { HeartIcon } from "@heroicons/react/24/outline";

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
    <div className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{numOfFavorites}</span>
    </div>
  );
}
