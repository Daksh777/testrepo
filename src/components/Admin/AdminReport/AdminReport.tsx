import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  useGetReportConfig,
  usePostReportConfig,
} from "@/services/adminServices";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Save,
  Loader2,
  FileText,
  Database,
  Settings,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const AdminReport = () => {
  const [isSaving, setIsSaving] = useState(false);

  const {
    data: configData,
    isLoading: isLoadingConfig,
    error: configError,
    refetch,
  } = useGetReportConfig();

  const { mutateAsync: postReportConfig } = usePostReportConfig();

  // Create dynamic schema based on config data
  const dynamicSchema = useMemo(() => {
    if (!configData?.config) {
      return z.object({});
    }

    const schemaFields: Record<string, z.ZodString> = {};
    Object.keys(configData.config).forEach((key) => {
      schemaFields[key] = z
        .string()
        .min(1, `${key.replace(/_/g, " ")} is required`)
        .max(200, `${key.replace(/_/g, " ")} must be less than 200 characters`);
    });

    return z.object(schemaFields);
  }, [configData]);

  type DynamicFormData = Record<string, string>;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm<DynamicFormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {},
  });

  // Update form when config data is loaded
  useEffect(() => {
    if (configData?.config) {
      const formData: Record<string, string> = {};
      Object.entries(configData.config).forEach(([key, value]) => {
        const stringValue = String(value || "");
        formData[key] = stringValue;
        setValue(key, stringValue);
      });
      reset(formData);
    }
  }, [configData, setValue, reset]);

  const onSubmit = async (data: Record<string, string>) => {
    try {
      setIsSaving(true);
      await postReportConfig({
        config: data,
      });
      toast.success("Report configuration updated successfully");
      reset(data); // Reset form dirty state
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail ||
          "Failed to update report configuration. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = () => {
    refetch();
    toast.success("Configuration refreshed");
  };

  // Helper function to format field names for display
  const formatFieldName = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Helper function to generate placeholder text
  const generatePlaceholder = (key: string) => {
    if (key.toLowerCase().includes("date")) {
      return "e.g., July 2023 or third quarter of 2023";
    }
    return `Enter ${formatFieldName(key).toLowerCase()}`;
  };

  // Helper function to generate help text
  const generateHelpText = (key: string) => {
    if (key.toLowerCase().includes("date")) {
      return "This date will appear in generated reports";
    }
    return `Configure the ${formatFieldName(key).toLowerCase()} setting`;
  };

  if (configError) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Error loading report configuration
              </h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error loading the report configuration. Please try
                again.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="text-red-700 border-red-300 hover:bg-red-50"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <FileText className="h-8 w-8 mr-3 text-blue-600" />
              Report Configuration
            </h1>
            <p className="text-gray-600">
              Manage global report settings and configuration values
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Database className="h-5 w-5" />
              <span>
                {configData?.config ? Object.keys(configData.config).length : 0}{" "}
                settings
              </span>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
              disabled={isLoadingConfig}
            >
              {isLoadingConfig ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Settings className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="max-w-4xl">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-600" />
              Configuration Settings
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Configure settings that will be used across the system
            </p>
          </div>

          {isLoadingConfig ? (
            <div className="p-8">
              <div className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                <span className="ml-2 text-gray-600">
                  Loading configuration...
                </span>
              </div>
            </div>
          ) : configData?.config &&
            Object.keys(configData.config).length > 0 ? (
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Dynamic Configuration Fields */}
              {Object.entries(configData.config).map(([key]) => (
                <div key={key} className="space-y-2">
                  <Label
                    htmlFor={key}
                    className="text-sm font-medium text-gray-700 flex items-center"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    {formatFieldName(key)}
                  </Label>
                  <Input
                    id={key}
                    {...register(key)}
                    placeholder={generatePlaceholder(key)}
                    className={`${
                      errors[key]
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  />
                  {errors[key] && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors[key]?.message as string}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {generateHelpText(key)}
                  </p>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  {isDirty && !isSaving && (
                    <>
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span className="text-amber-600">
                        You have unsaved changes
                      </span>
                    </>
                  )}
                  {!isDirty && !isSaving && (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">
                        Configuration saved
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (configData?.config) {
                        const formData: Record<string, string> = {};
                        Object.entries(configData.config).forEach(
                          ([key, value]) => {
                            formData[key] = String(value || "");
                          }
                        );
                        reset(formData);
                      }
                    }}
                    disabled={!isDirty || isSaving}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Reset Changes
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isDirty || isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Configuration
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-8">
              <div className="text-center text-gray-500">
                <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No configuration settings found</p>
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="mt-4"
                >
                  Refresh
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Current Configuration Display */}
        {configData?.config &&
          Object.keys(configData.config).length > 0 &&
          !isLoadingConfig && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Current Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {Object.entries(configData.config).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium text-blue-700">
                      {formatFieldName(key)}:
                    </span>
                    <p className="text-blue-600 mt-1">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default AdminReport;
