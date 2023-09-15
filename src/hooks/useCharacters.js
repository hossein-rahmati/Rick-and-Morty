import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    setIsLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character?name=${query}`, {
        cancelToken: source.token,
      })
      .then(({ data }) => {
        setCharacters(data.results.slice(0, 5));
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          toast.error(error.response.data.error, { id: 1 });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    //cleanup function
    return () => {
      source.cancel();
    };
  }, [query]);

  return { isLoading, characters };
}
