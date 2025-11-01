import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import useUrlState from "@/hooks/useUrlState";
import { useAssignPassToUser } from "@/services/adminServices";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Save,
  Loader2,
  UserPlus,
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import BreadCrumb from "@/components/utils/BreadCrumb";

const assignPassSchema = z.object({
  user: z.coerce.number().min(1, "User ID must be at least 1"),
  pass_type: z.coerce.number().min(1, "Pass type ID must be at least 1"),
});

type AssignPassFormData = z.infer<typeof assignPassSchema>;

const AssignPass = () => {
  const navigate = useNavigate();

  // Use URL state for form inputs
  const [userIdStr, setUserIdStr] = useUrlState({
    key: "user",
    defaultValue: "",
  });
  const [passTypeIdStr, setPassTypeIdStr] = useUrlState({
    key: "pass_type",
    defaultValue: "",
  });

  const {
    mutate: assignPass,
    isPending: isAssigning,
    isSuccess,
  } = useAssignPassToUser();

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isValid },
  } = useForm<AssignPassFormData>({
    resolver: zodResolver(assignPassSchema),
    mode: "onChange",
    defaultValues: {
      user: userIdStr ? parseInt(userIdStr) : undefined,
      pass_type: passTypeIdStr ? parseInt(passTypeIdStr) : undefined,
    },
  });

  const watchedFields = watch();
  const { user, pass_type } = watchedFields;

  // Navigate back after successful assignment
  React.useEffect(() => {
    if (isSuccess) {
      navigate("/admin/passes");
    }
  }, [isSuccess, navigate]);

  const onSubmit = (data: AssignPassFormData) => {
    assignPass(data);
  };

  const handleCancel = () => {
    navigate("/admin/passes");
  };

  useEffect(() => {
    setUserIdStr(user?.toString() || "");
  }, [user]);

  useEffect(() => {
    setPassTypeIdStr(pass_type?.toString() || "");
  }, [pass_type]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Passes
            </Button>
            <div className="hidden md:block">
              <BreadCrumb
                flow={[
                  { link: "/admin", label: "Dashboard" },
                  { link: "/admin/passes", label: "Passes" },
                  { link: "/admin/passes/assign", label: "Assign Pass" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Assign Pass to User
          </h1>
          <p className="text-gray-600">
            Assign a subscription pass to a user by entering their User ID and
            Pass Type ID
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Assignment Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Assignment Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User ID */}
              <div className="space-y-2">
                <Label
                  htmlFor="user"
                  className="text-sm font-medium text-gray-700"
                >
                  <User className="w-4 h-4 inline mr-2" />
                  User ID
                </Label>
                <div className="relative">
                  <Input
                    id="user"
                    type="number"
                    min="1"
                    placeholder="Enter User ID (e.g., 123)"
                    {...register("user")}
                    className={cn(
                      "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                      {
                        "border-red-300 focus:border-red-500 focus:ring-red-200":
                          errors.user,
                        "border-green-300 focus:border-green-500 focus:ring-green-200":
                          user && !errors.user,
                      }
                    )}
                  />
                  {user && !errors.user && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.user && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.user.message}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Enter the numeric ID of the user you want to assign the pass
                  to
                </p>
              </div>

              {/* Pass Type ID */}
              <div className="space-y-2">
                <Label
                  htmlFor="pass_type"
                  className="text-sm font-medium text-gray-700"
                >
                  <CreditCard className="w-4 h-4 inline mr-2" />
                  Pass Type ID
                </Label>
                <div className="relative">
                  <Input
                    id="pass_type"
                    type="number"
                    min="1"
                    placeholder="Enter Pass Type ID (e.g., 5)"
                    {...register("pass_type")}
                    className={cn(
                      "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                      {
                        "border-red-300 focus:border-red-500 focus:ring-red-200":
                          errors.pass_type,
                        "border-green-300 focus:border-green-500 focus:ring-green-200":
                          pass_type && !errors.pass_type,
                      }
                    )}
                  />
                  {pass_type && !errors.pass_type && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.pass_type && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.pass_type.message}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Enter the numeric ID of the pass type you want to assign
                </p>
              </div>
            </div>
          </div>

          {/* Current Values Display */}
          {(user || pass_type) && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Current Assignment
              </h3>
              <div className="text-sm text-blue-800">
                {user && (
                  <div>
                    User ID: <span className="font-semibold">{user}</span>
                  </div>
                )}
                {pass_type && (
                  <div>
                    Pass Type ID:{" "}
                    <span className="font-semibold">{pass_type}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isAssigning}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isAssigning}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isAssigning ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Assigning Pass...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Assign Pass</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignPass;
