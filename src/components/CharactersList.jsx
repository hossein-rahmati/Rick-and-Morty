import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

function CharactersList({ characters, isLoading, onSelectCharacter, selectedId }) {
  return (
    <div className="characters-list">
      {isLoading ? (
        <Loader />
      ) : (
        characters.map((c) => (
          <Character key={c.id} character={c}>
            <button className="icon red" onClick={() => onSelectCharacter(c.id)}>
              {selectedId === c.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </Character>
        ))
      )}
    </div>
  );
}

export default CharactersList;

export function Character({ character, children }) {
  return (
    <div className="list__item">
      <img src={character.image} alt={character.name} />
      <CharacterName name={character.name} gender={character.gender} />
      <CharacterInfo status={character.status} species={character.species} />
      {children}
    </div>
  );
}

function CharacterName({ gender, name }) {
  return (
    <h3 className="name">
      <span>{gender === "Male" ? "👨" : "👩‍🦳"}</span>
      <span>{name}</span>
    </h3>
  );
}

function CharacterInfo({ status, species }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${status === "Dead" ? "red" : ""}`}></span>
      <span> {status}</span>
      <span> - {species}</span>
    </div>
  );
}
