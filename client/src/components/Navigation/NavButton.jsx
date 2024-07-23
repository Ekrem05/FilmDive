import { Link } from "react-router-dom";

export default function NavButton({ label, link }) {
  return (
    <Link
      className="text-white text-lg font-default font-light tracking-tighter"
      to={link}
    >
      {label}
    </Link>
  );
}
