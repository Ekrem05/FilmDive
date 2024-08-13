import { useEffect } from "react";
import { addToWatchlist } from "@/http/user";
import { useNavigation } from "react-router";
import { refreshToken } from "@/http/token";
export default function Watchlist() {
  const navigate = useNavigation();
  useEffect(() => {
    async function req() {
      const response = await addToWatchlist();
      if (response == 401) {
        console.log("we here");
        //check if the user has enabled Rememeber me if so
        const refreshTokenResponse = await refreshToken();
        console.log("refreshed");
        if (refreshTokenResponse === 400) {
          navigate("/auth/login");
        } else if (refreshTokenResponse.data) {
          localStorage.setItem("token", refreshTokenResponse.data.token);
          localStorage.setItem(
            "refresh token",
            refreshTokenResponse.data.refreshToken
          );
          req();
        }
      }
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    } else {
      req();
    }
  });
  return <div></div>;
}
