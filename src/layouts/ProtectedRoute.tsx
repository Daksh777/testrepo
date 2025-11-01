import { matchPath, Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { useAuthStore, User } from "@/stores/authStore";
import { useEffect } from "react";
import { useGetUser } from "@/services/auth";
import { useLoginStore } from "@/stores/loginStore";

const ProtectedRoute = () => {
  const { user, login, logout } = useAuthStore((state) => state);
  const { pathname } = useLocation();
  const { data: userData } = useGetUser();
  const navigate = useNavigate();
  const { setIsLoginOpen } = useLoginStore();

  useEffect(() => {
    if (userData) {
      if (user?.pass_active === userData?.pass_active) {
        return;
      } else {
        login({
          ...user,
          ...userData,
        } as User);
      }
    }
  }, [userData, user]);

  useEffect(() => {
    if (matchPath("/user/pass/upgrade", pathname)) {
      return;
    }
    if (!user) {
      navigate("/");
      setIsLoginOpen(true);
      return;
    }
  }, [user, pathname, navigate, logout, setIsLoginOpen]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
