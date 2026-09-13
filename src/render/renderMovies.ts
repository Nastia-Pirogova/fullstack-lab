import type { Movie } from "../types/movie";
import { isFavorite } from "../favorites/favorites";

export default function renderItem(
  movies: Movie[],
  container: HTMLElement,
  className: string,
): void {
  movies.forEach((post) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
                     <div class="${className} col-12 p-2" id="${post.id}">
                        <div class="card shadow-sm">
                            <img src="https://image.tmdb.org/t/p/original${post.poster}" alt="${post.title}"/>
                           
                               <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="red"
                                    fill="${isFavorite(post.id) ? "red" : "#ff000078"}"
                                    width="50"
                                    height="50"
                                    data-movie-id="${post.id}"
                                    class="favorite-btn bi bi-heart-fill position-absolute p-2"
                                    viewBox="0 -2 18 22"
                                   
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                    />
                                </svg>
                               
                                
                                <div class="card-body">
                                    <p class="card-text truncate">
                                        ${post.overview}
                                    </p>
                                    <div
                                        class="
                                            d-flex
                                            justify-content-between
                                            align-items-center
                                        "
                                    >
                                        <small class="text-muted">${post.releaseDate}</small>
                                    </div>
                                </div>
                            </div>
                        </div>`,
    );
  });
}
