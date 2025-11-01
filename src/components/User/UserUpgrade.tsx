import {
  useCheckoutSessionForLoginUser,
  useGetAllAvailablePlans,
  useCheckoutSessionForUnknownUser,
} from "@/services/subscriprionServices";
import PricingCard from "../PricingCard/PricingCard";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { Plan } from "@/types/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router";
import { useAuthStore } from "@/stores/authStore";

const UserUpgrade = () => {
  const { data: availablePlans } = useGetAllAvailablePlans();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [searchParams] = useSearchParams();
  const currentPass = searchParams.get("current_pass");
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (availablePlans && availablePlans.length > 0) {
      setSelectedPlan(availablePlans[0]);
    }
  }, [availablePlans]);

  const mutateCheckoutSession = useCheckoutSessionForLoginUser();
  const mutateCheckoutSessionForUnknownUser =
    useCheckoutSessionForUnknownUser();

  const handleCheckoutSession = () => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split("//");
    const domain = urlParts[0] + "//" + urlParts[1].split("/")[0];

    const cancel_url = domain + "/user/pass";
    const success_url = domain + "/payment-success";

    if (selectedPlan) {
      if (user) {
        mutateCheckoutSession
          .mutateAsync({
            pass_id: selectedPlan.id,
            cancel_url,
            success_url,
          })
          .then((res) => {
            if (res?.payment_url) {
              window.location.replace(res.payment_url);
            } else {
              toast.error("Something went wrong");
            }
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      } else {
        mutateCheckoutSessionForUnknownUser
          .mutateAsync({
            pass_id: selectedPlan.id,
            cancel_url,
            success_url,
          })
          .then((res) => {
            if (res?.payment_url) {
              window.location.replace(res.payment_url);
            } else {
              toast.error("Something went wrong");
            }
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      }
    }
  };

  if (!availablePlans) return <LoadingSpinner />;
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-base-secondary flex-col">
      <div className="bg-primary-blue h-fit px-10 md:px-20 w-full py-4 md:py-10">
        <div className="text-white text-3xl font-semibold text-center">
          Pass Plans
        </div>
      </div>
      <div className="flex flex-col w-[90%] mx-auto md:max-w-lg gap-8 my-8">
        <div className="flex flex-row">
          {availablePlans?.map((plan: Plan, index: number) => (
            <div
              key={plan.id}
              className={cn(
                "bg-white px-4 border border-gray-200 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 relative",
                selectedPlan?.id === plan.id && "bg-base-green text-white ",
                selectedPlan?.id !== plan.id &&
                  "hover:bg-gray-100 text-gray-600",
                index === 0 && "rounded-l-md",
                index === availablePlans.length - 1 && "rounded-r-md"
              )}
              onClick={() => setSelectedPlan(plan)}
            >
              {currentPass === plan.id.toString() && (
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-fit w-fit bg-gray-500 text-white text-[8px] rounded-full px-2 py-1 z-10">
                  Active
                </div>
              )}
              {plan.name}
            </div>
          ))}
        </div>
        {selectedPlan && (
          <div className="max-w-lg w-full">
            <PricingCard selectedPlan={selectedPlan} />
          </div>
        )}
        <div
          onClick={handleCheckoutSession}
          className="w-full bg-base-green rounded-md text-white text-center py-3 font-semibold flex flex-row items-center justify-center gap-4 cursor-pointer hover:scale-105 transition-all duration-300 group"
        >
          {mutateCheckoutSession.isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ShoppingCartIcon className="w-5 h-5" /> Buy
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserUpgrade;
