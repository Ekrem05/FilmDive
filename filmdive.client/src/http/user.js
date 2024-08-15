export async function addToWatchlist({ token, id, name, date, rating, genre }) {
  const response = await fetch(`/User/watchlist/${genre}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
      name: name,
      date: date,
      rating: rating,
    }),
  });
  if (response.status === 401) {
    throw Error("401");
  } else if (!response.ok) {
    return 400;
  }
  const data = await response.json();
  return data;
}
