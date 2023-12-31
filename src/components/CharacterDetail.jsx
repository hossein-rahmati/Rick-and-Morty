import { useEffect, useState } from "react";
import { ArrowUpCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "./Loader";
import { toast } from "react-hot-toast";

function CharacterDetail({ selectedId, onAddFavorite, isExistInFavorites }) {
  const [character, setCharacter] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // character fetch
        setIsLoading(true);
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);
        setCharacter(data);

        // episode fetch
        const episodesId = data.episode.map((e) => {
          return e.split("/").at(-1);
        });
        const { data: episodeData } = await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}`);
        setEpisodes([episodeData].flat());
      } catch (error) {
        toast.error(error.response.data.error, { id: 1 });
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading) {
    return (
      <div style={{ flex: 1 }}>
        <Loader />
      </div>
    );
  }

  if (!character || !selectedId) {
    return <div style={{ flex: 1, color: "var(--slate-300)", fontSize: "larger" }}>Please select a character</div>;
  }

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo character={character} isExistInFavorites={isExistInFavorites} onAddFavorite={onAddFavorite} />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ character, isExistInFavorites, onAddFavorite }) {
  return (
    <div className="character-detail">
      <img className="character-detail__img" src={character.image} alt={character.name} />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨" : "👩‍🦳"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
          <span>&nbsp;{character.status}</span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isExistInFavorites ? (
            <p style={{ display: "flex", gap: "3px", alignItems: "center" }}>
              Already added to favorites <CheckCircleIcon className="icon green" />
            </p>
          ) : (
            <button className="btn btn--primary" onClick={() => onAddFavorite(character)}>
              Add to favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodess;

  if (sortBy) {
    sortedEpisodess = [...episodes].sort((a, b) => new Date(a.created) - new Date(b.created));
  } else {
    sortedEpisodess = [...episodes].sort((a, b) => new Date(b.created) - new Date(a.created));
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of episodes</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon className="icon" style={{ rotate: sortBy ? "" : "-180deg" }} />
        </button>
      </div>
      <ul>
        {sortedEpisodess.map((e, index) => (
          <li key={e.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {e.episode} : <strong>{e.name}</strong>
            </div>
            <div className="badge badge--secondary">{e.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
