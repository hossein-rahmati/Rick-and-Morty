function CharactersList({ allCharacters }) {
  return (
    <div className="characters-list">
      {allCharacters.map((c) => (
        <Character key={c.id} name={c.name} status={c.status} />
      ))}
    </div>
  );
}

export default CharactersList;

function Character({ name, status }) {
  return (
    <div className="list__item">
      <p>{name}</p>
      <p>{status}</p>
    </div>
  );
}
