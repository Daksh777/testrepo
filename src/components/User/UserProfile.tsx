import React from "react";
import BreadCrumb from "../utils/BreadCrumb";
import {
  BookIcon,
  ChevronRightIcon,
  Loader2,
  LockIcon,
  Ticket,
} from "lucide-react";
import { useForgotPassword, useGetUser } from "@/services/auth";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const SettingsItem = ({
  icon,
  title,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  title: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className="flex flex-row items-center gap-2 group hover:bg-gray-100 px-2 py-3 hover:rounded-md cursor-pointer border-b border-gray-200 transition-all duration-150"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <div className="text-sm text-gray-700 group-hover:text-gray-900 group-hover:font-semibold transition-all duration-150">
        {title}
      </div>
      <ChevronRightIcon className="w-4 h-4 ml-auto text-gray-500 group-hover:text-gray-900" />
    </button>
  );
};

const PassBadge = ({ isPass }: { isPass: boolean }) => {
  if (!isPass)
    return (
      <div className="text-xs text-red-500 border border-red-500 rounded-full px-2">
        Expired
      </div>
    );
  return (
    <div className="text-xs text-base-green border border-base-green rounded-full px-2">
      Active
    </div>
  );
};

const UserProfile = () => {
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const navigate = useNavigate();
  const { mutateAsync: forgotPassword, isPending: isForgotPasswordPending } =
    useForgotPassword();
  const handleForgotPassword = async () => {
    await forgotPassword({
      email: user?.email || "",
    })
      .then(() => {
        toast.success("Password reset email sent");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  if (isLoadingUser || !user) return <LoadingSpinner />;
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-base-secondary flex-col gap-y-10 pb-10">
      <div className="bg-primary-blue h-fit px-10 md:px-20 w-full py-4">
        <BreadCrumb
          flow={[
            { link: "/search", label: "Home search" },
            { link: "/user/profile", label: "Profile" },
          ]}
        />
        <div className="text-white text-3xl font-semibold text-center">
          User Profile
        </div>
      </div>
      <div className="w-[90%] md:max-w-lg mx-auto bg-white py-10 px-10 rounded-md md:w-full my-auto flex flex-col shadow-md">
        <div className="mx-auto">
          <div className="h-20 w-20 rounded-full bg-base-secondary flex items-center justify-center text-gray-600 text-base border border-gray-100">
            {user?.first_name.charAt(0)}
            {user?.last_name.charAt(0)}
          </div>
        </div>
        <div className="text-center text-2xl font-semibold mt-4">
          {user?.first_name} {user?.last_name}
        </div>
        <div className="text-center text-sm text-gray-500 mt-1">
          {user?.email}
        </div>
        <div className="text-center text-sm text-gray-500 mt-1">
          {user?.phone_number}
        </div>
        <Link
          to="/user/profile/edit"
          className="mx-auto w-fit px-4 py-2 bg-base-green text-white rounded-md mt-4 text-xs cursor-pointer"
        >
          Edit profile
        </Link>
        <div className="mt-6 font-semibold text-lg">Settings</div>
        <div className="mt-4 flex flex-col ">
          <SettingsItem
            icon={<Ticket className="w-4 h-4 text-gray-700" />}
            title={
              <div className="flex flex-row gap-4 items-center">
                Pass <PassBadge isPass={user?.pass_active || false} />
              </div>
            }
            onClick={() => navigate("/user/pass")}
          />
          <SettingsItem
            icon={<BookIcon className="w-4 h-4 text-gray-700" />}
            title="Orders"
            onClick={() => navigate("/user/orders")}
          />
          <SettingsItem
            icon={
              isForgotPasswordPending ? (
                <Loader2 className="w-4 h-4 text-gray-700 animate-spin" />
              ) : (
                <LockIcon className="w-4 h-4 text-gray-700" />
              )
            }
            title="Change Password"
            onClick={handleForgotPassword}
            disabled={isForgotPasswordPending}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
