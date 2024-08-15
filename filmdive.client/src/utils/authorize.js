import { isTokenExpired } from "@/utils/token";
export default async function authorize() {
  var token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const isExpired = isTokenExpired(token);
  if (isExpired) {
    const isRemembering = localStorage.getItem("remember");
    if (isRemembering === "true") {
      const refreshToken = localStorage.getItem("refreshToken");
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
        return null;
      }
      const data = await response.json();
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      return data.data.token;
    } else if (isRemembering === "false") {
      return null;
    }
  } else {
    return token;
  }
}
