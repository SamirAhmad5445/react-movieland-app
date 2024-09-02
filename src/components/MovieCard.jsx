const MovieCard = ({ imdbID, Year, Poster, Title, Type }) => (
  <a
    href={`https://www.imdb.com/title/${imdbID}`}
    target="__blank"
    className="movie"
  >
    <div>
      <p>{Year}</p>
    </div>

    <div>
      <img
        src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
        alt={Title}
      />
    </div>

    <div>
      <span>{Type}</span>
      <h3>{Title}</h3>
    </div>
  </a>
);

export default MovieCard;
