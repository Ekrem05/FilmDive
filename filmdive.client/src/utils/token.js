import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return true;
  console.log("wee");
  const decoded = jwtDecode(token);
  console.log(decoded);
  const now = Date.now().valueOf() / 1000;

  return decoded.exp < now;
}

function isTokenAboutToExpire(token, timeWindowInSeconds = 300) {
  if (!token) return true;
  const decoded = jwtDecode(token);
  const now = Date.now().valueOf() / 1000;

  return decoded.exp - now < timeWindowInSeconds;
}
