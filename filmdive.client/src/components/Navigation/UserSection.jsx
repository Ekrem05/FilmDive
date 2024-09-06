import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
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
    localStorage.removeItem("refreshToken");
    navigate("/auth/login");
  }
  return (
    <>
      {data && (
        <Popover>
          <PopoverTrigger>
            <FaUser className="bg-primary text-primaryText size-12 rounded-full p-2" />
          </PopoverTrigger>
          <PopoverContent className="bg-headerColor">
            <ul>
              <li
                className="flex gap-1 hover:cursor-pointer  items-center"
                onClick={logout}
              >
                <img
                  className="w-5 xl:w-5   text-headerColor rounded-full"
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
