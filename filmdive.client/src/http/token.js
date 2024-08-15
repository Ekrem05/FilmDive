export async function refreshToken({ token, refreshToken }) {
  const queryParams = new URLSearchParams({
    AccessToken: token,
    RefreshToken: refreshToken,
  }).toString();

  const response = await fetch(`/Token/refresh?${queryParams}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 400) {
    throw new Error("invalid token");
  }
  const data = await response.json();
  return data;
}
