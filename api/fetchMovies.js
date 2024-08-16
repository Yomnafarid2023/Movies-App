import axios from "axios";
import { useQuery } from "react-query";

const fetchMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7"
    );

    return res.data.results; // Check this structure
  } catch (error) {
    return error;
  }
};

const useMovies = () => useQuery("movies", fetchMovies);
export default useMovies;
