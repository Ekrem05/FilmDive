export async function addToWatchlist() {
  const token = localStorage.getItem("token");
  const response = await fetch("/User/watchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    return 401;
  } else if (!response.ok) {
    return 400;
  }
  const data = await response.json();
  return data;
}
