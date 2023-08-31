import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Logo 😍</div>
      <div>
        <input type="text" className="text-field" placeholder="search..." />
      </div>
      <div className="navbar__result">Found 5 characters</div>
      <div className="heart">
        <HeartIcon className="icon" />
        <span className="badge">2</span>
      </div>
    </nav>
  );
}

export default Navbar;
