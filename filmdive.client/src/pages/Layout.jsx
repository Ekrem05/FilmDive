import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Footer from "@/components/Footer/Footer";
const client = new QueryClient();

export default function Layout() {
  return (
    <>
      <QueryClientProvider client={client}>
        <Header>
          <Navigation />
          <Outlet />
          <Footer />
        </Header>
      </QueryClientProvider>
    </>
  );
}
