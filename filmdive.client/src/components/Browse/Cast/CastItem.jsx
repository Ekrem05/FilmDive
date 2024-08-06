import { useNavigate, useParams } from "react-router";

export default function CastItem({ item }) {
  const { genres, year, rating, orderBy, cast } = useParams();
  const navigate = useNavigate();
  function handleClick(event) {
    const currentYear = new Date().getFullYear();
    navigate(
      `/browse/${genres ? genres : "all"}/${year ? year : `all`}/${
        rating ? rating : "all"
      }/${orderBy ? orderBy : "default"}/${item.id}`
    );
  }

  return (
    <li
      key={item.id}
      className="rounded-xl flex flex-col gap-1 2xl:w-48 bg-accentdrk text-highlightdrk hover:bg-secondarydrk hover:cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${item.profilePicture}`}
        className="rounded-xl flex-grow-0 "
      />
      <footer className="flex justify-between px-2 py-1 rounded-xl">
        <p className="text-lg text-headersdrk">{item.name}</p>
        <div className="bg-bgdrk rounded-2xl py-1 px-2 self-center">
          {item.field}
        </div>
      </footer>
    </li>
  );
}