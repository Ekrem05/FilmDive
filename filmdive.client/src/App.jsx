import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import AuthLayout from "./pages/AuthLayout";
import SignUp from "./components/Auth/SignUp";
import LogIn from "./components/Auth/LogIn";
import Series from "./pages/Series";
import SeriesDetails from "./pages/SeriesDetails";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
        children: [
          {
            path: ":genres?/:year?/:rating?/:orderBy?/:cast?",
            element: <Movies />,
          },
        ],
      },
      {
        path: "/series",
        element: <Series />,
        children: [
          {
            path: ":genres?/:year?/:rating?/:orderBy?/:cast?",
            element: <Series />,
          },
        ],
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "/details/:id",
        element: <SeriesDetails />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
