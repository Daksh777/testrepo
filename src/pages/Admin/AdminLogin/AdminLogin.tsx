import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useAdminLogin } from "@/services/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAdminAuthStore } from "@/stores/adminAuthStore";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync: loginUser, isPending: isLoginLoading } = useAdminLogin();
  const { setAdmin } = useAdminAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    loginUser(data)
      .then((res) => {
        if (res?.user?.role == "ADMIN" || res?.user?.role == "DATA_EDITOR") {
          setAdmin({
            ...res?.user,
            token: res?.access,
            refreshToken: res?.refresh,
          });
          if (res?.user?.role == "ADMIN") {
            navigate("/admin/dashboard");
          } else {
            navigate("/admin/database");
          }
        } else {
          toast.error("You are not authorized to access this page");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@company.com"
                {...register("email")}
                className={cn(
                  "bg-gray-50 border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors",
                  {
                    "border-red-300 focus:border-red-500 focus:ring-red-500":
                      errors.email,
                  }
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
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
                    "pr-12 bg-gray-50 border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors",
                    {
                      "border-red-300 focus:border-red-500 focus:ring-red-500":
                        errors.password,
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
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={!isValid || isLoginLoading}
              className={cn(
                "w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors",
                {
                  "opacity-50 cursor-not-allowed": !isValid,
                }
              )}
            >
              {isLoginLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
