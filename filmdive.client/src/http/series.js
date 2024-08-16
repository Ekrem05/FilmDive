export async function getPopularTvSeries() {
  console.log("hii");
  const response = await fetch("/Series/popular", {
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
export async function getAiringTvSeries() {
  const response = await fetch("/Series/airing", {
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
export async function getAiringTodayTvSeries() {
  const response = await fetch("/Series/airing-today", {
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
export async function getShowDetails({ id, token }) {
  const response = await fetch(`/Series/details?id=${id}`, {
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
export async function browseSeries({
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
  console.log({
    page,
    genres,
    fromRating,
    toRating,
    fromYear,
    toYear,
    orderBy,
    cast,
  });
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
  const url = `/Series/browse?${queryString}`;

  const response = await fetch(url, {
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
export async function seriesGenres() {
  console.log("genres");
  const response = await fetch("/Series/genres", {
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
  const response = await fetch(`/Series/recommend?id=${id}`, {
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
