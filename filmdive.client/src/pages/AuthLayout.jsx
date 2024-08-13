import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useMyTheme from "@/hooks/useMyTheme";
import { useSelector } from "react-redux";
const client = new QueryClient();

export default function AuthLayout() {
  const theme = useSelector((state) => state.movie.theme);
  useMyTheme(theme);
  return (
    <>
      <QueryClientProvider client={client}>
        <main className={theme}>
          <Outlet />
        </main>
      </QueryClientProvider>
    </>
  );
}
