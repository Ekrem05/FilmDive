import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return true;
  console.log("wee");
  try {
    const decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000;

    return decoded.exp < now;
  } catch (error) {
    return false;
  }
}

function isTokenAboutToExpire(token, timeWindowInSeconds = 300) {
  if (!token) return true;
  const decoded = jwtDecode(token);
  const now = Date.now().valueOf() / 1000;

  return decoded.exp - now < timeWindowInSeconds;
}
