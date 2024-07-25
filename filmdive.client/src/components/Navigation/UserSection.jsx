import { useQuery } from "@tanstack/react-query";
import svg from "../../assets/user-icon-svgrepo-com.svg";
import { useNavigate } from "react-router";
import logoutSVG from "../../assets/log-out-svgrepo-com.svg";

import { userDetails } from "@/http/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function UserSection() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["details"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      return userDetails({ token });
    },
  });
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh token");
    navigate("/auth/login");
  }
  return (
    <>
      {data && (
        <Popover>
          <PopoverTrigger>
            <img
              className="w-5 xl:w-10 hover:cursor-pointer bg-highlightdrk rounded-full p-1 m-1"
              src={svg}
              alt=""
            />
          </PopoverTrigger>
          <PopoverContent className="bg-headersdrk">
            <ul>
              <li
                className="flex gap-1 hover:cursor-pointer  items-center"
                onClick={logout}
              >
                <img
                  className="w-5 xl:w-5   text-headersdrk rounded-full"
                  src={logoutSVG}
                  alt=""
                />
                Log out
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
