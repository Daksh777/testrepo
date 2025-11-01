import { DollarSign, CreditCard, Users } from "lucide-react";
import StatCard from "./StatCard";
import { useAdminDashboardStats } from "@/services/adminServices";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import TransactionsTable from "../TransactionsTable/TransactionsTable";

const AdminDashboradMain = () => {
  console.log("dashboard");
  const { data: dashboardStats, isLoading } = useAdminDashboardStats();

  if (isLoading)
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your admin metrics and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={dashboardStats?.total_revenue || 0}
          icon={DollarSign}
        />
        <StatCard
          title="Total Transactions"
          value={dashboardStats?.total_transactions || 0}
          icon={CreditCard}
        />
        <StatCard
          title="Total Users"
          value={dashboardStats?.total_users || 0}
          icon={Users}
        />
      </div>

      <div className="mb-8">
        <TransactionsTable
          data={dashboardStats?.latest_transactions || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AdminDashboradMain;
