import { useParams, useNavigate, Link } from "react-router";
import { useDeletePass, useGetSingleUser } from "@/services/adminServices";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Clock,
  Shield,
  CreditCard,
  BarChart3,
  XCircle,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import BreadCrumb from "@/components/utils/BreadCrumb";
import { toast } from "sonner";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  date_joined: string;
  last_login: string;
  is_active: boolean;
  usage_quota: {
    allowed_no_of_searches: number | null;
    searches_made: number;
    searches_remaining: string;
    allowed_no_of_profiles: number;
    profiles_downloaded: number;
    profiles_remaining: number;
    last_reset_at: string;
  } | null;
  active_pass: {
    id: number;
    pass_type: {
      id: number;
      name: string;
      validity_duration: string;
      price: string;
      no_of_searches: number | null;
      no_of_neighborhood_profiles: number;
      additional_report_price: string;
      active: boolean;
    };
    activated_at: string;
    expires_at: string;
    is_active: boolean;
  } | null;
}

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: userData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetSingleUser(id!);
  const { mutateAsync: deletePass } = useDeletePass();

  const handleBackClick = () => {
    navigate("/admin/users");
  };

  const handleDeletePass = () => {
    console.log("delete pass");
    deletePass(userData?.active_pass?.id || "0")
      .then(() => {
        toast.success("Pass deleted successfully");
        refetch();
      })
      .catch((err) => {
        toast.error(err.response?.data?.detail || "Failed to delete pass");
      });
  };

  if (isLoading || isFetching) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-red-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Error loading user
              </h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error loading the user data. Please try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const user = userData as UserData;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50 flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
            <div className="hidden md:block">
              <BreadCrumb
                flow={[
                  { link: "/admin", label: "Dashboard" },
                  { link: "/admin/users", label: "Users" },
                  { link: `/admin/users/${id}`, label: `User #${id}` },
                ]}
              />
            </div>
          </div>
          <div className="text-sm text-gray-500">User ID: #{user.id}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="w-[90%] mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* User Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.first_name && user.last_name
                      ? `${user.first_name} ${user.last_name}`
                      : user.email}
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={`font-medium ${
                  user.is_active
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>

            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Email
                  </div>
                  <div className="text-gray-900 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {user.email}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Role
                  </div>
                  <div className="text-gray-900 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-gray-400" />
                    {user.role}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Date Joined
                  </div>
                  <div className="text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {format(new Date(user.date_joined), "MMM dd, yyyy")}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Last Login
                  </div>
                  <div className="text-gray-900 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {user.last_login
                      ? format(new Date(user.last_login), "MMM dd, yyyy HH:mm")
                      : "Never"}
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            {user.usage_quota ? (
              <div className="border-t border-gray-200 pt-8 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Usage Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 mb-1">
                      Searches
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {user.usage_quota.searches_made}
                    </div>
                    <div className="text-sm text-blue-600">
                      of{" "}
                      {user.usage_quota.allowed_no_of_searches || "Unlimited"}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-green-700 mb-1">
                      Profiles Downloaded
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {user.usage_quota.profiles_downloaded}
                    </div>
                    <div className="text-sm text-green-600">
                      of {user.usage_quota.allowed_no_of_profiles}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Last reset:{" "}
                  {format(
                    new Date(user.usage_quota.last_reset_at),
                    "MMM dd, yyyy HH:mm"
                  )}
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-8 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Usage Statistics
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600">No usage data available</p>
                  <p className="text-sm text-gray-500 mt-1">
                    User has not activated any pass yet
                  </p>
                </div>
              </div>
            )}

            {/* Active Pass */}
            {user.active_pass ? (
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Active Pass
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.active_pass.pass_type.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Pass ID: #{user.active_pass.id}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`font-medium ${
                        user.active_pass.is_active
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {user.active_pass.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Price
                      </div>
                      <div className="text-gray-900">
                        £{user.active_pass.pass_type.price}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Additional Report Price
                      </div>
                      <div className="text-gray-900">
                        £{user.active_pass.pass_type.additional_report_price}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Searches Allowed
                      </div>
                      <div className="text-gray-900">
                        {user.active_pass.pass_type.no_of_searches ||
                          "Unlimited"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Profiles Allowed
                      </div>
                      <div className="text-gray-900">
                        {user.active_pass.pass_type.no_of_neighborhood_profiles}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Activated At
                      </div>
                      <div className="text-gray-900">
                        {format(
                          new Date(user.active_pass.activated_at),
                          "MMM dd, yyyy HH:mm"
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Expires At
                      </div>
                      <div className="text-gray-900">
                        {format(
                          new Date(user.active_pass.expires_at),
                          "MMM dd, yyyy HH:mm"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Active Pass
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600">No active pass</p>
                  <p className="text-sm text-gray-500 mt-1">
                    User has not purchased or activated any pass
                  </p>
                </div>
              </div>
            )}

            {/* Admin Actions */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Admin Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/admin/transactions/?search=${encodeURIComponent(
                    user.email
                  )}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    View Transactions
                  </Button>
                </Link>
                <Link
                  to={`/admin/reports/?search=${encodeURIComponent(
                    user.email
                  )}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    View Orders
                  </Button>
                </Link>
                <Link to={`/admin/passes/assign?user=${user.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    Assign New Pass
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                  onClick={handleDeletePass}
                >
                  Delete Pass
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
