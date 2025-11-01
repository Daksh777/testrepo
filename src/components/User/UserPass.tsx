/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/stores/authStore";
import BreadCrumb from "../utils/BreadCrumb";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { useGetCurrentSubscription } from "@/services/subscriprionServices";
import { format } from "date-fns";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const UserPass = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const {
    data: currentSubscription,
    isLoading: isLoadingCurrentSubscription,
    error: currentSubscriptionError,
  } = useGetCurrentSubscription();

  useEffect(() => {
    if (!currentSubscriptionError) return;
    if (
      (currentSubscriptionError as any)?.status == 404 ||
      (currentSubscriptionError as any)?.status == 403
    ) {
      toast.error("No active pass found");
      navigate("/user/pass/upgrade");
      return;
    }
    navigate("/search");
  }, [currentSubscriptionError, navigate]);

  const handleUpgrade = () => {
    navigate(
      `/user/pass/upgrade?current_pass=${currentSubscription?.pass_type?.id}`
    );
  };

  if (isLoadingCurrentSubscription || !currentSubscription)
    return <LoadingSpinner />;
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-base-secondary flex-col gap-y-10 pb-10">
      <div className="bg-primary-blue h-fit px-10 md:px-20 w-full py-8 relative">
        <div className="top-4 hidden md:block md:left-20 absolute">
          <BreadCrumb
            flow={[
              { link: "/search", label: "Home search" },
              { link: "/user/profile", label: "Profile" },
              { link: "/user/pass", label: "Pass" },
            ]}
          />
        </div>
        <div className="text-white text-3xl font-semibold text-center">
          Manage Pass
        </div>
      </div>

      <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto bg-white py-10 px-10 rounded-md my-auto flex flex-col shadow-md">
        <div className="text-xl font-semibold">Your Pass</div>
        <div className="h-[1px] bg-gray-200 my-4" />
        <div className="text-lg text-gray-800 mb-1">Email</div>
        <div className="text-base text-gray-500">{user?.email}</div>
        <div className="h-[1px] bg-gray-200 my-4" />
        <div className="flex flex-row justify-between items-center">
          <div className="text-lg text-gray-800">Current Pass</div>
          <div
            onClick={handleUpgrade}
            className="bg-base-green text-white px-4 py-2 rounded-md cursor-pointer text-sm font-semibold"
          >
            Upgrade
          </div>
        </div>

        <div className="text-base text-gray-500 flex flex-row gap-2">
          <div className="font-light">Pass: </div>
          <div className="">{currentSubscription?.pass_type?.name}</div>
        </div>
        <div className="text-base text-gray-500 flex flex-row gap-2">
          <div className="font-light">Searches: </div>
          <div className="">
            {currentSubscription?.usage_quota?.searches_made} /{" "}
            {currentSubscription?.usage_quota?.allowed_no_of_searches ||
              "Unlimited"}
          </div>
        </div>
        <div className="text-base text-gray-500 flex flex-row gap-2">
          <div className="font-light">Neighbourhood Profiles: </div>
          <div className="">
            {currentSubscription?.usage_quota?.profiles_remaining} /{" "}
            {currentSubscription?.usage_quota?.allowed_no_of_profiles}
          </div>
        </div>
        {/* <div className="text-base text-gray-500 flex flex-row gap-2">
          <div className="font-light">
            Additional Neighbourhood Profiles Price:
          </div>
          <div className="">
            £ {currentSubscription?.pass_type?.additional_report_price}
          </div>
        </div> */}
        <div className="text-base text-gray-500 flex flex-row gap-2">
          <div className="font-light">Price:</div>
          <div className="">£ {currentSubscription?.pass_type?.price}</div>
        </div>
        <div className="text-base text-gray-500 flex flex-row gap-2">
          <div className="font-light">Start Date:</div>
          <div className="">
            {format(new Date(currentSubscription?.activated_at), "dd MMM yyyy")}
          </div>
        </div>
        <div className="h-[1px] bg-gray-200 my-4" />
        <div className="text-lg text-gray-800 mb-1">Expire Date</div>
        <div className="text-base text-gray-500">
          {format(
            new Date(currentSubscription?.expires_at),
            "dd MMM yyyy HH:mm"
          )}
        </div>
        <div className="flex md:flex-row flex-col justify-center gap-x-4 gap-y-2 mt-4">
          <div className="bg-base-green text-white px-4 py-2 rounded-md cursor-pointer text-sm font-semibold text-center">
            Buy More Profiles
          </div>
          <div
            onClick={handleUpgrade}
            className="bg-base-green text-white px-4 py-2 rounded-md cursor-pointer text-sm font-semibold text-center"
          >
            Buy New Pass
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPass;
