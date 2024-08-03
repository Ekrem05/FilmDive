export async function getTrendingMovies() {
  const response = await fetch("/Movies/trending", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
export async function getPopularMovies() {
  const response = await fetch("/Movies/popular", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
export async function getGenres() {
  const response = await fetch("/Movies/genres", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
export async function browseMovies({
  page,
  genres,
  fromYear,
  toYear,
  orderBy,
}) {
  const response = await fetch("/Movies/browse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      withGenres: genres,
      page: page,
      fromYear: fromYear,
      toYear: toYear,
      sortBy: orderBy,
    }),
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
export async function getUpcomingMovies() {
  const response = await fetch("Movies/upcoming", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
export async function getNowPlayingMovies() {
  const response = await fetch("Movies/now-playing", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
export async function getMovieDetails(id) {
  const response = await fetch(`/Movies/details?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
export async function getRecommendations(id) {
  const response = await fetch(`/Movies/recommend?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data;
}
