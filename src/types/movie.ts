export interface TMDBMoviesResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovie {
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface Movie {
  id: number;
  overview: string;
  poster: string;
  releaseDate: string;
  title: string;
}

export type MovieCategory = "popular" | "top_rated" | "upcoming" | "search";
