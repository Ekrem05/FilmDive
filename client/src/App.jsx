import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
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
        path: "movie/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
