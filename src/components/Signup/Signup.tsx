/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Loader2,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  useGoogleLogin as useGoogleLoginMutation,
  useSignup,
} from "@/services/auth";
import { SignupData } from "@/types/authTypes";
import { DialogProps } from "@/types/types";
import GoogleLogo from "@/assets/Google";
import { useLoginStore } from "@/stores/loginStore";

const schema = z
  .object({
    firstName: z.string().min(2, "Name must be at least 2 characters"),
    lastName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export interface SignupProps extends DialogProps {
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Signup = () => {
  const { isSignupOpen, setIsSignupOpen, setIsLoginOpen } = useLoginStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    mutate: signup,
    isPending: isSignupLoading,
    isSuccess: isSignupSuccess,
  } = useSignup();
  const { mutate: googleLogin, isSuccess: isGoogleVerifySuccess } =
    useGoogleLoginMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data: FormData) => {
    const payload: SignupData = {
      email: data?.email,
      password: data?.password,
      password_confirm: data?.confirmPassword,
      first_name: data?.firstName,
      last_name: data?.lastName,
    };
    signup(payload);
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
  });

  const goToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };
  useEffect(() => {
    if (isSignupSuccess || isGoogleVerifySuccess) {
      setIsSignupOpen(false);
    }
  }, [isSignupSuccess, isGoogleVerifySuccess, setIsSignupOpen]);

  return (
    <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
      <DialogContent className="sm:max-w-lg rounded-2xl border-0 p-0 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header Section */}
        <div className="bg-primary-blue p-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
              Create Account
            </DialogTitle>
          </DialogHeader>
          <div className="text-blue-100 text-sm">
            Join us today! It only takes a minute to get started
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            autoComplete="off"
          >
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <User className="w-4 h-4" />
                  First Name
                </label>
                <div className="relative">
                  <Input
                    placeholder="Enter first name"
                    {...register("firstName")}
                    className={cn(
                      "bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
                      {
                        "border-red-300 focus:border-red-500 focus:ring-red-200":
                          errors?.firstName,
                        "border-green-300 focus:border-green-500 focus:ring-green-200":
                          firstName &&
                          !errors?.firstName &&
                          firstName.length >= 2,
                      }
                    )}
                  />
                  {firstName && !errors?.firstName && firstName.length >= 2 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
                {errors?.firstName && (
                  <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                    <span className="w-1 h-1 bg-red-600 rounded-full" />
                    {errors?.firstName?.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <User className="w-4 h-4" />
                  Last Name
                </label>
                <div className="relative">
                  <Input
                    placeholder="Enter last name"
                    {...register("lastName")}
                    className={cn(
                      "bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
                      {
                        "border-red-300 focus:border-red-500 focus:ring-red-200":
                          errors?.lastName,
                        "border-green-300 focus:border-green-500 focus:ring-green-200":
                          lastName && !errors?.lastName && lastName.length >= 2,
                      }
                    )}
                  />
                  {lastName && !errors?.lastName && lastName.length >= 2 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
                {errors?.lastName && (
                  <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                    <span className="w-1 h-1 bg-red-600 rounded-full" />
                    {errors?.lastName?.message}
                  </p>
                )}
              </div>
            </div>

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
                  autoComplete="email webauthn"
                  placeholder="Enter your email address"
                  {...register("email")}
                  className={cn(
                    "bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
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
                  placeholder="Create a strong password"
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
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className={cn(
                    "pr-12 bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
                    {
                      "border-red-300 focus:border-red-500 focus:ring-red-200":
                        errors.confirmPassword,
                      "border-green-300 focus:border-green-500 focus:ring-green-200":
                        confirmPassword &&
                        password === confirmPassword &&
                        !errors.confirmPassword,
                    }
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {confirmPassword &&
                password === confirmPassword &&
                !errors.confirmPassword && (
                  <p className="text-xs text-green-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                    <CheckCircle className="w-3 h-3" />
                    Passwords match perfectly!
                  </p>
                )}

              {errors.confirmPassword && (
                <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                  <span className="w-1 h-1 bg-red-600 rounded-full" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              disabled={!isValid || isSignupLoading}
              className={cn(
                "w-full cursor-pointer h-12 bg-base-green hover:bg-base-green/80 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg",
                {
                  "opacity-50 cursor-not-allowed": !isValid,
                  "animate-pulse": isSignupLoading,
                }
              )}
            >
              {isSignupLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
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

          {/* Google Signup Button */}
          <div className="w-full">
            <button
              onClick={() => onGoogleLogin()}
              className="w-full cursor-pointer text-sm border border-gray-300 rounded-xl p-3 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-sm hover:shadow-md"
            >
              <GoogleLogo className="w-5 h-5" />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={goToLogin}
                className="text-primary-blue font-semibold transition-colors hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
