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
  return data.data;
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
  return data.data;
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
  return data.data;
}
export async function browseMovies({
  page,
  genres,
  fromRating,
  toRating,
  fromYear,
  toYear,
  orderBy,
  cast,
}) {
  const params = new URLSearchParams();
  if (page && page !== "") params.append("Page", page);
  if (genres && genres.length > 0)
    genres.map((genre) => params.append("WithGenres", genre));
  if (fromRating && fromRating !== "") params.append("FromRating", fromRating);
  if (toRating && toRating !== "") params.append("ToRating", toRating);
  if (fromYear && fromYear !== "") params.append("FromYear", fromYear);
  if (toYear && toYear !== "") params.append("ToYear", toYear);
  if (orderBy && orderBy !== "") params.append("SortBy", orderBy);
  if (cast && cast.length > 0) params.append("WithCast", cast);

  const queryString = params.toString();
  const url = `/Movies/browse?${queryString}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error();
  }

  const data = await response.json();
  return data.data;
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
  return data.data;
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
  return data.data;
}
export async function getMovieDetails({ id, token }) {
  const response = await fetch(`/Movies/details?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data.data;
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
  return data.data;
}
