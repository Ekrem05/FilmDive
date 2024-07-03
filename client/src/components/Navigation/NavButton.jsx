export default function NavButton({ label, link }) {
  return (
    <a className="text-white text-lg font-default" href={link}>
      {label}
    </a>
  );
}
