import { Link, useNavigate, useSearchParams } from "react-router";
import Logo from "@/assets/images/Unmapt Logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, Lock, Shield, CheckCircle } from "lucide-react";
import { useResetPassword } from "@/services/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const formSchema = z
  .object({
    new_password1: z.string().min(8, "Password must be at least 8 characters"),
    new_password2: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.new_password1 === data.new_password2, {
    message: "Passwords do not match",
    path: ["new_password2"],
  });

type FormData = z.infer<typeof formSchema>;

const ForgotPasswordSet = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const password = watch("new_password1");
  const confirmPassword = watch("new_password2");

  const onSubmit = (data: FormData) => {
    if (!searchParams.has("uid") || !searchParams.has("token")) {
      toast.error("Invalid link");
      navigate("/search");
      return;
    }
    resetPassword({
      uid: searchParams.get("uid") as string,
      token: searchParams.get("token") as string,
      new_password1: data.new_password1,
      new_password2: data.new_password2,
    });
  };

  const {
    mutate: resetPassword,
    isPending: isForgotPasswordLoading,
    isSuccess: isForgotPasswordSuccess,
    isError: isForgotPasswordError,
  } = useResetPassword();

  useEffect(() => {
    if (isForgotPasswordSuccess) {
      toast.success("Password reset successfully");
      navigate("/search");
    }
    if (isForgotPasswordError) {
      toast.error("Failed to reset password");
    }
  }, [isForgotPasswordSuccess, isForgotPasswordError, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="h-16 flex flex-row px-6 md:px-20 items-center">
          <Link to="/search" className="transition-transform hover:scale-105">
            <div className="flex flex-row items-center gap-4">
              <img
                src={Logo}
                alt="logo"
                width={120}
                className="drop-shadow-sm"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-blue to-blue-600 shadow-lg">
        <div className="px-6 md:px-20 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
              Reset Your Password
            </h1>
            <p className="text-blue-100 text-lg">
              Choose a strong password to secure your account
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* New Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="new_password1"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <Lock className="w-4 h-4" />
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...register("new_password1")}
                      className={cn(
                        "pr-12 bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
                        {
                          "border-red-300 focus:border-red-500 focus:ring-red-200":
                            errors.new_password1,
                          "border-green-300 focus:border-green-500 focus:ring-green-200":
                            password &&
                            !errors.new_password1 &&
                            password.length >= 8,
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

                  {errors.new_password1 && (
                    <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                      <span className="w-1 h-1 bg-red-600 rounded-full" />
                      {errors.new_password1.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="new_password2"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      {...register("new_password2")}
                      className={cn(
                        "pr-12 bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
                        {
                          "border-red-300 focus:border-red-500 focus:ring-red-200":
                            errors.new_password2,
                          "border-green-300 focus:border-green-500 focus:ring-green-200":
                            confirmPassword &&
                            password === confirmPassword &&
                            !errors.new_password2,
                        }
                      )}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                    !errors.new_password2 && (
                      <p className="text-xs text-green-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                        <CheckCircle className="w-3 h-3" />
                        Passwords match perfectly!
                      </p>
                    )}

                  {errors.new_password2 && (
                    <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                      <span className="w-1 h-1 bg-red-600 rounded-full" />
                      {errors.new_password2.message}
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
                      <span>Resetting Password...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5" />
                      <span>Reset Password</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                      Security Tip
                    </h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Make sure your new password is unique and not used on
                      other websites. Consider using a password manager for
                      better security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to Login Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/search"
                  className="text-sm text-gray-600 hover:text-primary-blue transition-colors font-medium"
                >
                  ← Back to Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordSet;
