import BrowseSeries from "../Lists/BrowseSeries";
import SideBar from "./SideBar";

export default function SeriesLayout() {
  return (
    <main className="bg-base flex sm:flex-row flex-col ">
      <SideBar />
      <BrowseSeries />
    </main>
  );
}
