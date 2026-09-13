import type { Movie } from "../types/movie";

const randomMovie: HTMLElement | null = document.getElementById("random-movie");

export default function renderBanner(movie: Movie): void {
  if (!randomMovie) return;

  randomMovie.innerHTML = `
    <div class="row py-lg-5 background"
      style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster}'); ">
      <div
        class="col-lg-6 col-md-8 mx-auto"
        style="background-image: linear-gradient(#2525254f); "
      >
        <h1 id="random-movie-name" class="fw-light text-light">${movie.title}</h1>
        <p id="random-movie-description" class="lead text-white">
          ${movie.overview}
        </p>
      </div>
    </div>
  `;
}
