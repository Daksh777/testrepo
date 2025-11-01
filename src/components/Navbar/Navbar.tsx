import { useState } from "react";
import Logo from "../../assets/images/Unmapt Logo.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router";
import { Login } from "../Login/Login";
import { Signup } from "../Signup/Signup";
import { useAuthStore } from "@/stores/authStore";
import { useLogout } from "@/services/auth";
import { ForgotPassword } from "../Login/ForgotPassword";
import { useLoginStore } from "@/stores/loginStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoginOpen,
    setIsLoginOpen,
    isSignupOpen,
    setIsSignupOpen,
    isForgotPasswordOpen,
  } = useLoginStore();
  const { mutate: logoutUser } = useLogout();
  return (
    <div className="h-16 bg-base-secondary flex flex-row px-10 md:px-20 items-center shrink-0">
      <Link to="https://unmapt.io/" target="_blank" className="shrink-0">
        <div className="flex flex-row items-center gap-4 shrink-0">
          <img src={Logo} alt="logo" width={120} />
        </div>
      </Link>

      {!user && (
        <div className="ml-auto text-sm flex flex-row gap-4">
          <div
            onClick={() => setIsLoginOpen(true)}
            className="bg-gray-200 px-4 py-2 rounded-md font-medium text-black hover:bg-gray-300 transition-all duration-300 cursor-pointer"
          >
            Login
          </div>
          <div
            onClick={() => setIsSignupOpen(true)}
            className="bg-gray-200 px-4 py-2 rounded-md font-medium text-black hover:bg-gray-300 transition-all duration-300 cursor-pointer"
          >
            Register
          </div>
        </div>
      )}
      {user && (
        <div className="ml-auto flex flex-row items-center ">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
              {" "}
              <div className="bg-base-green flex flex-row items-center gap-2 rounded-full p-2 text-white border-2 border-white hover:border-primary-blue transition-all duration-300 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div className="text-sm font-medium truncate max-w-[100px] md:max-w-fit">
                  {user.first_name} {user.last_name}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              className="max-w-fit p-0 m-0 overflow-hidden mr-4"
            >
              <div className="flex flex-col divide-y divide-gray-200">
                <Link
                  to="/user/profile"
                  className="text-sm font-normal hover:text-primary-blue hover:bg-gray-100 transition-all duration-150 cursor-pointer px-4 py-3"
                >
                  User Profile
                </Link>
                <Link
                  to="/user/orders"
                  className="text-sm font-normal hover:text-primary-blue hover:bg-gray-100 transition-all duration-150 cursor-pointer px-4 py-3"
                >
                  Neighborhood Profiles
                </Link>
                <div
                  className="text-sm font-normal hover:text-primary-blue hover:bg-gray-100 transition-all duration-150 cursor-pointer px-4 py-3"
                  onClick={() => navigate("/saved")}
                >
                  Saved Searches
                </div>
                <Link
                  to="/liked"
                  className="text-sm font-normal hover:text-primary-blue hover:bg-gray-100 transition-all duration-150 cursor-pointer px-4 py-3"
                >
                  Favourites
                </Link>
                <div
                  className="text-sm font-normal hover:text-primary-blue hover:bg-gray-100 transition-all duration-150 cursor-pointer px-4 py-3"
                  onClick={() => {
                    navigate("/");
                    logoutUser();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      {isLoginOpen && <Login />}
      {isSignupOpen && <Signup />}
      {isForgotPasswordOpen && <ForgotPassword />}
    </div>
  );
};

export default Navbar;
