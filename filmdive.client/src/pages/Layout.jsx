import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Footer from "@/components/Footer/Footer";
import ThemeButton from "@/components/Buttons/ThemeButton";
import useMyTheme from "@/hooks/useMyTheme";
import { useSelector } from "react-redux";
const client = new QueryClient();

export default function Layout() {
  const theme = useSelector((state) => state.movie.theme);
  useMyTheme(theme);
  return (
    <main className={theme}>
      <QueryClientProvider client={client}>
        <Header>
          <Navigation />
          <Outlet />
          <ThemeButton />
          <Footer />
        </Header>
      </QueryClientProvider>
    </main>
  );
}
