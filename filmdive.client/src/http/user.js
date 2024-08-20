export async function addToWatchlist({
  token,
  id,
  title,
  voteAverage,
  releaseDate,
  posterPath,
  genre,
}) {
  const response = await fetch(`/User/watchlist/${genre}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
      title: title,
      releaseDate: releaseDate,
      voteAverage: voteAverage,
      posterPath: posterPath,
    }),
  });
  if (response.status === 401) {
    throw Error("401");
  } else if (!response.ok) {
    return 400;
  }
  const data = await response.json();
  return data.data;
}
export async function removeFromWatchlist({ token, id, genre }) {
  const response = await fetch(`/User/watchlist/${genre}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: `"${id}"`,
  });
  if (response.status === 401) {
    throw Error("401");
  } else if (!response.ok) {
    return 400;
  }
  const data = await response.json();
  return data.data;
}
export async function getWatchlist({ token }) {
  console.log(token);
  const response = await fetch(`/User/watchlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    throw Error("401");
  } else if (!response.ok) {
    return 400;
  }
  const data = await response.json();
  return data.data;
}
