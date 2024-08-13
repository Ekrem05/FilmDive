export async function refreshToken() {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh token");

  const queryParams = new URLSearchParams({
    AccessToken: token,
    RefreshToken: refreshToken,
  }).toString();
  console.log(queryParams);
  const response = await fetch(`/Token/refresh?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("later");
  if (response.status === 400) {
    return 400;
  }
  const data = await response.json();
  return data;
}
