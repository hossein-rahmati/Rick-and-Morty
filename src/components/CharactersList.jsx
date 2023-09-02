import { EyeIcon } from "@heroicons/react/24/outline";

function CharactersList({ characters }) {
  return (
    <div className="characters-list">
      {characters.map((c) => (
        <Character
          key={c.id}
          name={c.name}
          status={c.status}
          image={c.image}
          gender={c.gender}
          species={c.species}
        />
      ))}
    </div>
  );
}

export default CharactersList;

function Character({ name, status, image, gender, species }) {
  return (
    <div className="list__item">
      <img src={image} alt={name} />
      <CharacterName name={name} gender={gender} />
      <CharacterInfo status={status} species={species} />
      <button className="icon red">
        <EyeIcon />
      </button>
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
