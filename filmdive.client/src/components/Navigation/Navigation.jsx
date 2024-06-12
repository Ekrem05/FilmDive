import svg from "../../assets/logo-transparent-white.svg";
import NavButton from "./NavButton";
export default function Navigation() {
  return (
    <header className="w-[100%] myHeader fixed z-[1]">
      <ul className="flex justify-between items-center p-5">
        <li className="w-20">
          <img src={svg} alt="" />
        </li>
        <li>
          <ul>
            <li>
              <NavButton label={"Browse"} link={"#"} />
            </li>
          </ul>
        </li>
        <ul className="flex gap-4">
          <li>
            <a className="text-textdrk text-lg font-default">Sign In</a>
          </li>
          <li>
            <a className="text-textdrk text-lg font-default">Log In</a>
          </li>
        </ul>
      </ul>
    </header>
  );
}
