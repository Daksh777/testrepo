/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  useGoogleLogin as useGoogleLoginMutation,
  useLogin,
} from "@/services/auth";
import {
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { DialogProps } from "@/types/types";
import GoogleLogo from "@/assets/Google";
import { useLoginStore } from "@/stores/loginStore";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

export interface LoginProps extends DialogProps {
  setIsSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsForgotPasswordOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = () => {
  const {
    isLoginOpen,
    setIsLoginOpen,
    setIsSignupOpen,
    setIsForgotPasswordOpen,
  } = useLoginStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: loginUser,
    isPending: isLoginLoading,
    isSuccess: isLoginSuccess,
  } = useLogin();
  const { mutate: googleLogin, isSuccess: isGoogleVerifySuccess } =
    useGoogleLoginMutation();
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
  const password = watch("password");

  const onSubmit = (data: FormData) => {
    loginUser(data);
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const token = credentialResponse.access_token;
    if (token) {
      googleLogin({ access_token: token });
    }
  };
  const handleGoogleError = () => {
    toast.error(" Google Login Failed. Please try again.");
  };

  const onGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    redirect_uri:
      typeof window !== "undefined" ? `${window.location.origin}/map` : "",
  });

  const goToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const goToForgotPassword = () => {
    setIsLoginOpen(false);
    setIsForgotPasswordOpen(true);
  };

  useEffect(() => {
    if (isLoginSuccess || isGoogleVerifySuccess) {
      setIsLoginOpen(false);
    }
  }, [isLoginSuccess, isGoogleVerifySuccess, setIsLoginOpen]);

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl border-0 p-0 overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="bg-primary-blue p-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
              Welcome Back!
            </DialogTitle>
          </DialogHeader>
          <div className="text-blue-100 text-sm">
            Sign in to your account to continue
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

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={cn(
                    "pr-12 bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
                    {
                      "border-red-300 focus:border-red-500 focus:ring-red-200":
                        errors.password,
                      "border-green-300 focus:border-green-500 focus:ring-green-200":
                        password && !errors.password && password.length >= 8,
                    }
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                  <span className="w-1 h-1 bg-red-600 rounded-full" />
                  {errors.password.message}
                </p>
              )}

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={goToForgotPassword}
                  className="text-xs text-primary-blue hover:text-blue-600 font-medium transition-colors hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={!isValid || isLoginLoading}
              className={cn(
                "w-full cursor-pointer h-12 bg-base-green hover:bg-base-green/80 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ",
                {
                  "opacity-50 cursor-not-allowed": !isValid,
                  "animate-pulse": isLoginLoading,
                }
              )}
            >
              {isLoginLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing you in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <Separator className="bg-gray-200" />
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-3 text-gray-500 text-sm font-medium">
              or continue with
            </span>
          </div>

          {/* Google Login Button */}
          <div className="w-full">
            <button
              onClick={onGoogleLogin}
              className="w-full cursor-pointer text-sm border border-gray-300 rounded-xl p-3 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-sm hover:shadow-md"
            >
              <GoogleLogo className="w-5 h-5" />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={goToSignup}
                className="text-primary-blue font-semibold transition-colors hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
