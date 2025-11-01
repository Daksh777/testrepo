import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetUser, useUpdateUser } from "@/services/auth";
import { useNavigate } from "react-router";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import BreadCrumb from "../utils/BreadCrumb";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2, User, CheckCircle, Save, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
});

type FormData = z.infer<typeof formSchema>;

const UserEdit = () => {
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const navigate = useNavigate();
  const {
    mutate: updateUser,
    isPending: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useUpdateUser();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const firstName = watch("first_name");
  const lastName = watch("last_name");

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user, reset]);

  // Navigate back to profile on success
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/user/profile");
    }
  }, [isUpdateSuccess, navigate]);

  const onSubmit = (data: FormData) => {
    updateUser(data);
  };

  const handleCancel = () => {
    navigate("/user/profile");
  };

  if (isLoadingUser || !user) return <LoadingSpinner />;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-base-secondary flex-col gap-y-10 pb-10">
      <div className="bg-primary-blue h-fit px-10 md:px-20 w-full py-4">
        <BreadCrumb
          flow={[
            { link: "/search", label: "Home search" },
            { link: "/user/profile", label: "Profile" },
            { link: "/user/profile/edit", label: "Edit" },
          ]}
        />
        <div className="text-white text-3xl font-semibold text-center">
          Edit Profile
        </div>
      </div>

      <div className="w-[90%] md:max-w-lg mx-auto bg-white py-10 px-10 rounded-md shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="first_name"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <User className="w-4 h-4" />
              First Name
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your first name"
                {...register("first_name")}
                className={cn(
                  "pl-4 pr-4 bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
                  {
                    "border-red-300 focus:border-red-500 focus:ring-red-200":
                      errors.first_name,
                    "border-green-300 focus:border-green-500 focus:ring-green-200":
                      firstName && !errors.first_name && firstName.length > 0,
                  }
                )}
              />
              {firstName && !errors.first_name && firstName.length > 0 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              )}
            </div>

            {errors.first_name && (
              <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                <span className="w-1 h-1 bg-red-600 rounded-full" />
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="last_name"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <User className="w-4 h-4" />
              Last Name
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your last name"
                {...register("last_name")}
                className={cn(
                  "pl-4 pr-4 bg-gray-50/50 border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 transition-all duration-200",
                  {
                    "border-red-300 focus:border-red-500 focus:ring-red-200":
                      errors.last_name,
                    "border-green-300 focus:border-green-500 focus:ring-green-200":
                      lastName && !errors.last_name && lastName.length > 0,
                  }
                )}
              />
              {lastName && !errors.last_name && lastName.length > 0 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              )}
            </div>

            {errors.last_name && (
              <p className="text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2 duration-200">
                <span className="w-1 h-1 bg-red-600 rounded-full" />
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="cursor-pointer flex-1 h-12 border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!isValid || !isDirty || isUpdateLoading}
              className={cn(
                "cursor-pointer flex-1 h-12 bg-base-green hover:bg-base-green/80 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg",
                {
                  "opacity-50 cursor-not-allowed": !isValid || !isDirty,
                  "animate-pulse": isUpdateLoading,
                }
              )}
            >
              {isUpdateLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
