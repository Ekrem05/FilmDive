import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
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
            path: ":filters",
            element: <Browse />,
          },
        ],
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
