import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router";
import {
  useCreatePass,
  useUpdatePass,
  useGetPassDetails,
} from "@/services/adminServices";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Save,
  Loader2,
  CreditCard,
  Calendar,
  Hash,
  DollarSign,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import BreadCrumb from "@/components/utils/BreadCrumb";

const passSchema = z
  .object({
    name: z
      .string()
      .min(1, "Pass name is required")
      .max(100, "Pass name must be less than 100 characters"),
    validity_days: z.coerce
      .number()
      .min(1, "Validity must be at least 1 day")
      .max(3650, "Validity cannot exceed 10 years"),
    price: z
      .string()
      .min(1, "Price is required")
      .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number (e.g., 29.99)"),
    no_of_searches: z.coerce
      .number()
      .min(1, "Number of searches must be at least 1")
      .optional(),
    unlimited_searches: z.boolean(),
    no_of_neighborhood_profiles: z.coerce
      .number()
      .min(1, "Number of profiles must be at least 1")
      .max(10000, "Number of profiles cannot exceed 10,000"),
    additional_report_price: z
      .string()
      .min(1, "Additional report price is required")
      .regex(
        /^\d+(\.\d{1,2})?$/,
        "Additional report price must be a valid number"
      ),
    active: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.unlimited_searches && !data.no_of_searches) {
        return false;
      }
      return true;
    },
    {
      message: "Either set unlimited searches or specify number of searches",
      path: ["no_of_searches"],
    }
  );

type PassFormData = z.infer<typeof passSchema>;

const AddEditPasse = () => {
  const [searchParams] = useSearchParams();
  const editPassId = searchParams.get("editPassId");
  const navigate = useNavigate();
  const isEdit = !!editPassId;
  console.log(editPassId);

  const {
    mutate: createPass,
    isPending: isCreating,
    isSuccess: isCreateSuccess,
  } = useCreatePass();
  const {
    mutate: updatePass,
    isPending: isUpdating,
    isSuccess: isUpdateSuccess,
  } = useUpdatePass();

  // Fetch pass details when editing
  const { data: passDetails, isLoading: isLoadingPassDetails } =
    useGetPassDetails(editPassId ? parseInt(editPassId) : 0);

  // Navigate back to passes list after successful creation/update
  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      navigate("/admin/passes");
    }
  }, [isCreateSuccess, isUpdateSuccess, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<PassFormData>({
    resolver: zodResolver(passSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      validity_days: 30,
      price: "",
      no_of_searches: undefined,
      unlimited_searches: true,
      no_of_neighborhood_profiles: 50,
      additional_report_price: "",
      active: true,
    },
  });

  // Populate form with pass details when editing
  useEffect(() => {
    if (passDetails && isEdit) {
      const validityDays = parseInt(
        passDetails.validity_duration.split(" ")[0]
      );
      const hasUnlimitedSearches = passDetails.no_of_searches === null;

      reset({
        name: passDetails.name,
        validity_days: validityDays,
        price: passDetails.price,
        no_of_searches: hasUnlimitedSearches
          ? undefined
          : passDetails.no_of_searches,
        unlimited_searches: hasUnlimitedSearches,
        no_of_neighborhood_profiles: passDetails.no_of_neighborhood_profiles,
        additional_report_price: passDetails.additional_report_price,
        active: passDetails.active,
      });
    }
  }, [passDetails, isEdit, reset]);

  const watchedFields = watch();
  const {
    name,
    price,
    validity_days,
    unlimited_searches,
    no_of_searches,
    no_of_neighborhood_profiles,
    additional_report_price,
    active,
  } = watchedFields;

  const handleUnlimitedSearchesChange = (checked: boolean) => {
    setValue("unlimited_searches", checked);
    if (checked) {
      setValue("no_of_searches", undefined);
    }
  };

  const onSubmit = (data: PassFormData) => {
    const payload = {
      name: data.name,
      validity_duration: `${data.validity_days} 00:00:00`,
      price: data.price,
      no_of_searches: data.unlimited_searches ? null : data.no_of_searches,
      no_of_neighborhood_profiles: data.no_of_neighborhood_profiles,
      additional_report_price: data.additional_report_price,
      active: data.active,
    };

    if (isEdit) {
      updatePass({ id: parseInt(editPassId), data: payload });
    } else {
      createPass(payload);
    }
  };

  const handleCancel = () => {
    navigate("/admin/passes");
  };

  const isLoading = isCreating || isUpdating || isLoadingPassDetails;

  // Show loading spinner while fetching pass details
  if (isEdit && isLoadingPassDetails) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          <span className="text-gray-600">Loading pass details...</span>
        </div>
      </div>
    );
  }

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
                  {
                    link: isEdit
                      ? `/admin/passes/new?editPassId=${editPassId}`
                      : "/admin/passes/new",
                    label: isEdit ? "Edit Pass" : "New Pass",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEdit ? "Edit Pass" : "Create New Pass"}
          </h1>
          <p className="text-gray-600">
            {isEdit
              ? "Update the subscription pass details"
              : "Create a new subscription pass for users"}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pass Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  <FileText className="w-4 h-4" />
                  Pass Name
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="e.g., Monthly Pro Plan"
                    {...register("name")}
                    className={cn(
                      "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                      {
                        "border-red-300 focus:border-red-500 focus:ring-red-200":
                          errors.name,
                        "border-green-300 focus:border-green-500 focus:ring-green-200":
                          name && !errors.name && name.length > 0,
                      }
                    )}
                  />
                  {name && !errors.name && name.length > 0 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.name && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Validity Duration */}
              <div className="space-y-2">
                <Label
                  htmlFor="validity_days"
                  className="text-sm font-medium text-gray-700"
                >
                  <Calendar className="w-4 h-4" />
                  Validity (Days)
                </Label>
                <div className="relative">
                  <Input
                    id="validity_days"
                    type="number"
                    min="1"
                    max="3650"
                    placeholder="Enter number of days"
                    {...register("validity_days")}
                    className={cn(
                      "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                      {
                        "border-red-300 focus:border-red-500 focus:ring-red-200":
                          errors.validity_days,
                        "border-green-300 focus:border-green-500 focus:ring-green-200":
                          validity_days && !errors.validity_days,
                      }
                    )}
                  />
                  {validity_days && !errors.validity_days && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.validity_days && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.validity_days.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700"
                >
                  <DollarSign className="w-4 h-4" />
                  Price (£)
                </Label>
                <div className="relative">
                  <Input
                    id="price"
                    placeholder="Enter price"
                    {...register("price")}
                    className={cn(
                      "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                      {
                        "border-red-300 focus:border-red-500 focus:ring-red-200":
                          errors.price,
                        "border-green-300 focus:border-green-500 focus:ring-green-200":
                          price && !errors.price && price.length > 0,
                      }
                    )}
                  />
                  {price && !errors.price && price.length > 0 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.price && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Additional Report Price */}
              <div className="space-y-2">
                <Label
                  htmlFor="additional_report_price"
                  className="text-sm font-medium text-gray-700"
                >
                  <FileText className="w-4 h-4" />
                  Additional Report Price (£)
                </Label>
                <div className="relative">
                  <Input
                    id="additional_report_price"
                    placeholder="Enter additional report price"
                    {...register("additional_report_price")}
                    className={cn(
                      "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                      {
                        "border-red-300 focus:border-red-500 focus:ring-red-200":
                          errors.additional_report_price,
                        "border-green-300 focus:border-green-500 focus:ring-green-200":
                          additional_report_price &&
                          !errors.additional_report_price &&
                          additional_report_price.length > 0,
                      }
                    )}
                  />
                  {additional_report_price &&
                    !errors.additional_report_price &&
                    additional_report_price.length > 0 && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    )}
                </div>
                {errors.additional_report_price && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.additional_report_price.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Limits */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Hash className="h-5 w-5 mr-2" />
              Limits
            </h2>

            <div className="space-y-6">
              {/* Unlimited Searches Checkbox */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="unlimited_searches"
                  checked={unlimited_searches}
                  onCheckedChange={handleUnlimitedSearchesChange}
                />
                <Label
                  htmlFor="unlimited_searches"
                  className="text-sm font-medium text-gray-700"
                >
                  Unlimited Searches
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Number of Searches */}
                {!unlimited_searches && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="no_of_searches"
                      className="text-sm font-medium text-gray-700"
                    >
                      <Hash className="w-4 h-4" />
                      Number of Searches
                    </Label>
                    <div className="relative">
                      <Input
                        id="no_of_searches"
                        type="number"
                        min="1"
                        placeholder="Enter number of searches"
                        {...register("no_of_searches")}
                        className={cn(
                          "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                          {
                            "border-red-300 focus:border-red-500 focus:ring-red-200":
                              errors.no_of_searches,
                            "border-green-300 focus:border-green-500 focus:ring-green-200":
                              no_of_searches && !errors.no_of_searches,
                          }
                        )}
                      />
                      {no_of_searches && !errors.no_of_searches && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </div>
                    {errors.no_of_searches && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.no_of_searches.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Number of Neighborhood Profiles */}
                <div className="space-y-2">
                  <Label
                    htmlFor="no_of_neighborhood_profiles"
                    className="text-sm font-medium text-gray-700"
                  >
                    <Users className="w-4 h-4" />
                    Number of Neighborhood Profiles
                  </Label>
                  <div className="relative">
                    <Input
                      id="no_of_neighborhood_profiles"
                      type="number"
                      min="1"
                      max="10000"
                      placeholder="Enter number of profiles"
                      {...register("no_of_neighborhood_profiles")}
                      className={cn(
                        "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                        {
                          "border-red-300 focus:border-red-500 focus:ring-red-200":
                            errors.no_of_neighborhood_profiles,
                          "border-green-300 focus:border-green-500 focus:ring-green-200":
                            no_of_neighborhood_profiles &&
                            !errors.no_of_neighborhood_profiles,
                        }
                      )}
                    />
                    {no_of_neighborhood_profiles &&
                      !errors.no_of_neighborhood_profiles && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                  </div>
                  {errors.no_of_neighborhood_profiles && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.no_of_neighborhood_profiles.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Status
            </h2>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="active"
                checked={active}
                onCheckedChange={(checked) =>
                  setValue("active", checked as boolean)
                }
              />
              <Label
                htmlFor="active"
                className="text-sm font-medium text-gray-700"
              >
                Active (available for users to purchase)
              </Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isEdit ? "Updating..." : "Creating..."}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>{isEdit ? "Update Pass" : "Create Pass"}</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPasse;
