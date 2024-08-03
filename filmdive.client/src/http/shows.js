export async function getPopularTvShows() {
  console.log("hii");
  const response = await fetch("/Shows/popular", {
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
export async function getAiringTvShows() {
  const response = await fetch("/Shows/airing", {
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
export async function getAiringTodayTvShows() {
  const response = await fetch("/Shows/airing-today", {
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
export async function getShowDetails(id) {
  const response = await fetch(`/Shows/details?id=${id}`, {
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
  const response = await fetch(`/Shows/recommend?id=${id}`, {
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
