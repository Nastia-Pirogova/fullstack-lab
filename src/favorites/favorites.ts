export function getFavorites(): number[] {
  const favoritesMovies = localStorage.getItem("favoriteMovies");

  if (favoritesMovies === null) {
    return [];
  }
  const parsed = JSON.parse(favoritesMovies) as number[];

  return parsed;
}

export function saveFavorites(favorites: number[]): void {
  localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
}

export function addFavorite(id: number): void {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    saveFavorites(favorites);
  }
}

export function deleteFavorite(id: number): void {
  const favorites = getFavorites();

  const updatedFavorites = favorites.filter((movieId) => movieId !== id);

  saveFavorites(updatedFavorites);
}

export function isFavorite(id: number): boolean {
  const favorites = getFavorites();
  return favorites.includes(id);
}
