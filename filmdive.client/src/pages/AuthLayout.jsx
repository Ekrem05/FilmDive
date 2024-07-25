import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
const client = new QueryClient();

export default function AuthLayout() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <>
      <QueryClientProvider client={client}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}
