import BrowseSeries from "../Lists/BrowseSeries";
import SideBar from "./SideBar";

export default function SeriesLayout() {
  return (
    <main className="bg-bgdrk flex sm:flex-row flex-col ">
      <SideBar />
      <BrowseSeries />
    </main>
  );
}
