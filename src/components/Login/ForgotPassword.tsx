/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForgotPassword } from "@/services/auth";
import { Loader2, Mail, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { DialogProps } from "@/types/types";
import { useLoginStore } from "@/stores/loginStore";
const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormData = z.infer<typeof formSchema>;

export interface ForgotPasswordProps extends DialogProps {
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ForgotPassword = () => {
  const { isForgotPasswordOpen, setIsForgotPasswordOpen, setIsLoginOpen } =
    useLoginStore();
  const {
    mutate: forgotPassword,
    isPending: isForgotPasswordLoading,
    isSuccess: isForgotPasswordSuccess,
    isError: isForgotPasswordError,
  } = useForgotPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const email = watch("email");

  const onSubmit = (data: FormData) => {
    forgotPassword(data);
  };

  useEffect(() => {
    if (isForgotPasswordSuccess) {
      toast.success("Reset link sent to your email");
      setIsForgotPasswordOpen(false);
    }
    if (isForgotPasswordError) {
      toast.error("Failed to send reset link");
    }
  }, [isForgotPasswordSuccess, isForgotPasswordError, setIsForgotPasswordOpen]);

  return (
    <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl border-0 p-0 overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="bg-primary-blue p-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
              Forgot Password?
            </DialogTitle>
          </DialogHeader>
          <div className="text-blue-100 text-sm">
            No worries! Enter your email and we'll send you a reset link
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  className={cn(
                    "pl-4 pr-4 bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
                    {
                      "border-red-300 focus:border-red-500 focus:ring-red-200":
                        errors.email,
                      "border-green-300 focus:border-green-500 focus:ring-green-200":
                        email && !errors.email && email.includes("@"),
                    }
                  )}
                />
                {email && !errors.email && email.includes("@") && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>

              {errors.email && (
                <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                  <span className="w-1 h-1 bg-red-600 rounded-full" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isValid || isForgotPasswordLoading}
              className={cn(
                "w-full cursor-pointer h-12 bg-gradient-to-r from-base-green to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl",
                {
                  "opacity-50 cursor-not-allowed": !isValid,
                  "animate-pulse": isForgotPasswordLoading,
                }
              )}
            >
              {isForgotPasswordLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Information Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                  What happens next?
                </h4>
                <ul className="text-xs text-blue-700 leading-relaxed space-y-1">
                  <li>• Check your email inbox and spam folder</li>
                  <li>• Click the reset link in the email</li>
                  <li>• Create a new secure password</li>
                  <li>• Sign in with your new password</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsForgotPasswordOpen(false);
                  setIsLoginOpen(true);
                }}
                className="text-primary-blue hover:underline font-medium transition-colors"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
