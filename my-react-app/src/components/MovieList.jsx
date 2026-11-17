import { useState } from "react";

const initialMovies = [
  { id: 1, title: "Spirited Away", year: 2001, rating: 8.6 },
  { id: 2, title: "Inception", year: 2010, rating: 8.8 },
  { id: 3, title: "Coco", year: 2017, rating: 8.4 },
  { id: 4, title: "The Matrix", year: 1999, rating: 8.7 },
  { id: 5, title: "Interstellar", year: 2014, rating: 8.7 },
];

function MovieList() {
  const [movies, setMovies] = useState(initialMovies);

  function sortNewestFirst() {
    setMovies((currentMovies) =>
      [...currentMovies].sort((a, b) => b.year - a.year),
    );
  }

  return (
    <div>
      <h2>Movies</h2>
      <button className="movie-sort-button" onClick={sortNewestFirst}>
        Sort newest to oldest
      </button>

      {movies.map((movie) => (
        <div key={movie.id} className="card movie-row">
          <div>
            <h3>{movie.title}</h3>
            <p>Released: {movie.year}</p>
          </div>

          <div className="movie-rating">
            ⭐ {movie.rating}/10
            {movie.rating >= 8.7 && <span className="top-badge">Top Rated</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
