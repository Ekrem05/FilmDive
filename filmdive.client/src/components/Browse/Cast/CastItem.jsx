import { useNavigate, useParams, useLocation } from "react-router";

export default function CastItem({ item }) {
  const { genres, year, rating, orderBy, cast } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  function handleClick(event) {
    const currentYear = new Date().getFullYear();
    const root = pathname.split("/")[1];

    navigate(
      `/${root}/${genres ? genres : "all"}/${year ? year : `all`}/${
        rating ? rating : "all"
      }/${orderBy ? orderBy : "popularity.desc"}/${item.id}`
    );
  }

  return (
    <li
      key={item.id}
      className="rounded-xl flex flex-col gap-1 2xl:w-48 hover:bg-primary transition-colors duration-200 text-primary hover:text-base hover:cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${item.profilePicture}`}
        className="rounded-xl flex-grow-0 "
      />
      <footer className="flex justify-between px-2 py-1 rounded-xl">
        <p className="text-lg transition-none ">{item.name}</p>
        <div className="bg-base text-callToAction rounded-2xl py-1 px-2 self-center">
          {item.field}
        </div>
      </footer>
    </li>
  );
}
