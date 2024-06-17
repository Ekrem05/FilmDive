export async function getTrendingMovies() {
  const response = await fetch("Movies/trending", {
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
  const response = await fetch("Movies/popular", {
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
