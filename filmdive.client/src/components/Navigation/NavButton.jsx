import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function NavButton({ label, link, onClick }) {
  const navigate = useNavigate();

  function handleClick() {
    console.log("hii");
    navigate(link);
    onClick();
  }
  return (
    <>
      {onClick ? (
        <button
          className="text-white text-lg font-default font-light tracking-tighter"
          onClick={handleClick}
        >
          {label}
        </button>
      ) : (
        <Link
          className="text-white text-lg font-default font-light tracking-tighter"
          to={link}
        >
          {label}
        </Link>
      )}
    </>
  );
}
