import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const client = new QueryClient();

export default function Layout() {
  return (
    <>
      <QueryClientProvider client={client}>
        <Header>
          <Navigation />
          <Outlet />
        </Header>
      </QueryClientProvider>
    </>
  );
}
