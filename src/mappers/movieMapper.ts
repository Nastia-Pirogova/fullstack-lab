import type { Movie, TMDBMovie } from "../types/movie";

export default function mapper(movie: TMDBMovie): Movie {
  return {
    id: movie.id,
    overview: movie.overview,
    poster: movie.poster_path,
    releaseDate: movie.release_date,
    title: movie.title,
  };
}
