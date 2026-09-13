import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/styles.css";

import { API_KEY, BASE_URL } from "./api/moviesApi";

import type {
  Movie,
  MovieCategory,
  TMDBMovie,
  TMDBMoviesResponse,
} from "./types/movie";

import mapper from "./mappers/movieMapper";

import {
  addFavorite,
  deleteFavorite,
  getFavorites,
  isFavorite,
} from "./favorites/favorites";

import renderBanner from "./render/renderBanner";
import renderItem from "./render/renderMovies";

let searchQuery = "";
let page = 1;
let currentCategory: MovieCategory = "popular";

const filmContainer = document.getElementById("film-container");
const favoriteMoviesContainer = document.getElementById("favorite-movies");
const filmCategoryContainer = document.querySelector("#button-wrapper");
const loadMore = document.getElementById("load-more");
const searchBlock = document.querySelector<HTMLInputElement>("#search");
const searchSubmit = document.querySelector("#search-submit");

const getMovies = (category: MovieCategory): string => {
  let endpoint = "";

  switch (category) {
    case "popular":
      endpoint = "/movie/popular";
      break;

    case "top_rated":
      endpoint = "/movie/top_rated";
      break;

    case "upcoming":
      endpoint = "/movie/upcoming";
      break;

    case "search":
      endpoint = `/search/movie?query=${encodeURIComponent(searchQuery)}`;
      break;

    default:
      endpoint = "";
      break;
  }

  return endpoint;
};

function getRandomMovie(movieList: Movie[]): Movie {
  const randomIndex = Math.floor(Math.random() * movieList.length);

  return movieList[randomIndex];
}

function loadMovies(category: MovieCategory, currentPage: number): void {
  const pageSeparator = category === "search" ? "&" : "?";

  const url = `${BASE_URL}${getMovies(category)}${pageSeparator}page=${currentPage}`;

  fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((data: TMDBMoviesResponse) => {
      const movies: Movie[] = data.results.map(mapper);

      if (movies.length > 0 && currentPage === 1) {
        const randomMovie = getRandomMovie(movies);

        renderBanner(randomMovie);
      }

      if (filmContainer) {
        renderItem(movies.slice(0, 16), filmContainer, "col-md-4 col-lg-3");
      }
    });
}

function searchMovies(): void {
  searchSubmit?.addEventListener("click", (event) => {
    event.preventDefault();

    if (!searchBlock) {
      return;
    }

    searchQuery = searchBlock.value.trim();

    if (!searchQuery) {
      return;
    }

    currentCategory = "search";
    page = 1;

    if (filmContainer) {
      filmContainer.innerHTML = "";
    }

    loadMovies(currentCategory, page);
  });
}

function loadFavoriteMovies(): void {
  const ids = getFavorites();

  const requests = ids.map((movieId) =>
    fetch(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data: TMDBMovie) => mapper(data)),
  );

  Promise.all(requests).then((favoriteMovies) => {
    if (!favoriteMoviesContainer) {
      return;
    }

    favoriteMoviesContainer.innerHTML = "";

    renderItem(favoriteMovies, favoriteMoviesContainer, "");
  });
}

function syncFavoriteButtons(): void {
  const favoriteButtons =
    document.querySelectorAll<SVGElement>(".favorite-btn");

  favoriteButtons.forEach((favoriteButton) => {
    const id = Number(favoriteButton.dataset.movieId);

    if (isFavorite(id)) {
      favoriteButton.setAttribute("fill", "red");
    } else {
      favoriteButton.setAttribute("fill", "#ff000078");
    }
  });
}

function initFavoriteButtons(container: HTMLElement): void {
  container.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const favoriteButton = event.target.closest<SVGElement>(".favorite-btn");

    if (!favoriteButton) {
      return;
    }

    const id = Number(favoriteButton.dataset.movieId);

    if (isFavorite(id)) {
      deleteFavorite(id);
    } else {
      addFavorite(id);
    }

    loadFavoriteMovies();
    syncFavoriteButtons();
  });
}

if (filmCategoryContainer) {
  const filmCategories = filmCategoryContainer.querySelectorAll(
    'input[name="btnradio"]',
  );

  filmCategories.forEach((filmCategoryInput) => {
    filmCategoryInput.addEventListener("change", () => {
      currentCategory = filmCategoryInput.id as MovieCategory;
      page = 1;

      if (filmContainer) {
        filmContainer.innerHTML = "";
      }

      loadMovies(currentCategory, page);
    });
  });
}

loadMore?.addEventListener("click", () => {
  page += 1;

  loadMovies(currentCategory, page);
});

if (filmContainer) {
  initFavoriteButtons(filmContainer);
}

if (favoriteMoviesContainer) {
  initFavoriteButtons(favoriteMoviesContainer);
}

searchMovies();
loadFavoriteMovies();
loadMovies(currentCategory, page);
