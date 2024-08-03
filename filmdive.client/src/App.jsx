import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import AuthLayout from "./pages/AuthLayout";
import SignUp from "./components/Auth/SignUp";
import LogIn from "./components/Auth/LogIn";
import SeriesDetails from "./pages/SeriesDetails";
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
        path: "/browse",
        element: <Browse />,
        children: [
          {
            path: ":genres?/:year?/:rating?/:orderBy?",
            element: <Browse />,
          },
        ],
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "/series/:id",
        element: <SeriesDetails />,
      },
    ],
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
