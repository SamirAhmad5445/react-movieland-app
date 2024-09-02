import { useEffect, useState } from "react";
import SearchIcon from "./assets/search.svg";
import LoadingIcon from "./assets/loading.svg";
import MovieCard from "./components/MovieCard";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = "http://www.omdbapi.com?apikey=" + API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies("one piece");
  }, []);

  const fetchMovies = async (movieTitle) => {
    setLoading(true);

    try {
      // const fetchURL = movieTitle ? API_URL + "&s=" + movieTitle : API_URL;
      const fetchURL = API_URL + "&s=" + movieTitle;
      const response = await fetch(fetchURL);
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      setLoading(false);
      setMovies(data.Search || []);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetchMovies(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <main className="app" onSubmit={handleSearch}>
      <h1>MovieLand</h1>

      <form className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />

        <button>
          <img src={SearchIcon} alt="" />
          <span className="sr-only ">search for movies</span>
        </button>
      </form>

      {loading ? (
        <img height={72} src={LoadingIcon} alt="Loading..." />
      ) : (
        <section className="container">
          {movies.length ? (
            movies.map((movie, index) => <MovieCard key={index} {...movie} />)
          ) : (
            <div className="empty">
              <h2>No movies found.</h2>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default App;
