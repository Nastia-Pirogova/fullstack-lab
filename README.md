# Typescript


## 🎬 Movie App

A movie search application built with **TypeScript** and **The Movie Database (TMDB) API**.

The application allows users to browse movies by category, search movies by title, save favorite movies in `localStorage`, display a random movie in the banner, and load additional movies using pagination.

### ✨ Features

#### 🔎 Movie Search

Users can search for movies by title using the TMDB Search API.

#### 🎞 Movie Categories

The application supports several movie categories:

* Popular movies
* Top rated movies
* Upcoming movies

#### ❤️ Favorite Movies

Users can add and remove movies from their favorites.

Favorite movie IDs are stored in the browser's `localStorage` inside the `favoriteMovies` array.

Features include:

* Add a movie to favorites
* Remove a movie from favorites
* Favorite state persists after page reload
* Favorite movies are loaded from TMDB by movie ID
* Favorite buttons are synchronized across the page
* Favorite movies are rendered in a separate section

#### 🎲 Random Movie

A random movie is selected from the loaded movies and displayed in the banner at the top of the page.

#### 📄 Pagination

The **Load more** button loads the next page of movies from the TMDB API.

The application displays 16 movies from every loaded page.

#### 🔄 Data Mapper

TMDB returns more movie information than the application needs.

A mapper converts the API response:

`TMDBMovie`

into the application's local:

`Movie`

interface.

This allows the application to work only with the required movie properties.

### 🛠 Technologies

* TypeScript
* JavaScript
* HTML
* CSS
* Bootstrap
* TMDB API
* LocalStorage
* Fetch API

No additional frameworks are used.

### 📁 Project Structure

```text
src/
├── api/
│   └── moviesApi.ts
│
├── favorites/
│   └── favorites.ts
│
├── mappers/
│   └── movieMapper.ts
│
├── render/
│   ├── renderBanner.ts
│   └── renderMovies.ts
│
├── styles/
│   └── styles.css
│
├── types/
│   └── movie.ts
│
└── main.ts
```

#### `api/`

Contains TMDB API configuration such as:

* Base URL
* API key

#### `types/`

Contains TypeScript interfaces and types:

* `Movie`
* `TMDBMovie`
* `TMDBMoviesResponse`
* `MovieCategory`

#### `mappers/`

Contains the mapper responsible for converting a TMDB movie object into the local `Movie` interface.

#### `favorites/`

Contains helper functions for working with favorite movie IDs in `localStorage`.

#### `render/`

Contains functions responsible for rendering movie cards and the random movie banner.

#### `index.ts`

Connects the application modules, handles user interactions, pagination, searching, API requests, and favorite button events.

### 🔌 TMDB API

This project uses [The Movie Database API](https://www.themoviedb.org/).

The following endpoints are used:

* `/movie/popular`
* `/movie/top_rated`
* `/movie/upcoming`
* `/search/movie`
* `/movie/{movie_id}`

Movie posters are loaded using the TMDB image service.

### 💾 LocalStorage

Favorite movie IDs are stored under the following key:

```text
favoriteMovies
```

Example:

```json
[550, 680, 155]
```

When the application starts, these IDs are used to request movie details from TMDB.

### 🚀 Getting Started

Clone the repository:

```bash
git clone <repository-url>
```

Open the project directory:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open the local development URL displayed in the terminal.

