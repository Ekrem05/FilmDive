import BrowseMovies from "../Lists/BrowseMovies";
import SideBar from "./SideBar";

export default function BrowseLayout() {
  return (
    <main className="bg-bgdrk flex sm:flex-row flex-col ">
      <SideBar />
      <BrowseMovies />
    </main>
  );
}
