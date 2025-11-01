import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useGetAllTransactions } from "@/services/adminServices";
import useUrlState from "@/hooks/useUrlState";
import { Link, useSearchParams } from "react-router";
import { DataTable } from "../DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Loader2,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import { format } from "date-fns";

interface TransactionItem {
  id: number;
  item_type: string;
  description: string;
  quantity: number;
  unit_amount: number;
  total_amount: number;
  created_at: string;
  transaction: string;
  pass_item: number;
}

interface TransactionUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  date_joined: string;
}

interface Transaction {
  id: string;
  user: TransactionUser;
  stripe_checkout_session_id: string;
  stripe_payment_intent_id: string;
  stripe_customer_id: string | null;
  amount_subtotal_display: string;
  amount_total_display: string;
  currency: string;
  status: string;
  customer_email_at_checkout: string;
  metadata: {
    pass_id?: string;
    user_id?: string;
    purchase_type?: string;
  };
  created_at: string;
  updated_at: string;
  items: TransactionItem[];
}

const TRANSACTION_STATUSES = [
  { value: "All Statuses", label: "All Statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "COMPLETED", label: "Completed" },
  { value: "FAILED", label: "Failed" },
  { value: "REFUNDED", label: "Refunded" },
];

const ShowTransactions = () => {
  const [, setSearchParams] = useSearchParams();

  // Use multiple URL state hooks for different parameters
  const [pageStr, setPageStr] = useUrlState({ key: "page", defaultValue: "1" });
  const [search, setSearch] = useUrlState({
    key: "search",
    defaultValue: "",
  });
  const [statusFilter, setStatusFilter] = useUrlState({
    key: "status",
    defaultValue: "All Statuses",
  });

  // Convert page to number
  const page = parseInt(pageStr);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPageStr("1");
  }, [search, statusFilter]);

  const {
    data: transactionsData,
    isLoading,
    error,
  } = useGetAllTransactions(page, search, statusFilter);

  // Helper functions
  const updatePage = (newPage: number) => {
    setPageStr(newPage.toString());
  };

  const clearFilters = () => {
    // Clear all URL parameters at once to avoid race conditions
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasActiveFilters =
    search || (statusFilter && statusFilter !== "All Statuses");

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => (
        <div className="font-mono text-xs text-gray-600">
          {row.getValue("id")?.toString().substring(0, 8)}...
        </div>
      ),
    },
    {
      accessorKey: "user",
      header: "Customer",
      cell: ({ row }) => {
        const user = row.getValue("user") as string;
        return (
          <Link to={`/admin/users/?search=${encodeURIComponent(user)}`}>
            <div className="font-medium text-gray-900">{user}</div>
          </Link>
        );
      },
    },
    {
      accessorKey: "items",
      header: "Item",
      cell: ({ row }) => {
        const items = row.getValue("items") as TransactionItem[];
        const metadata = row.original.metadata;
        const status = row.original.status;
        const firstItem = items?.[0];

        if (!firstItem) return <span className="text-gray-500">—</span>;

        return (
          <div>
            <div className="font-medium text-gray-900">
              {firstItem.description}
            </div>
            {status === "COMPLETED" && metadata?.purchase_type && (
              <div className="text-xs text-gray-500">
                {metadata.purchase_type.replace("_", " ").toUpperCase()}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "amount_total_display",
      header: "Amount",
      cell: ({ row }) => (
        <div className="font-semibold text-gray-900">
          {row.getValue("amount_total_display")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "completed":
              return "bg-green-100 text-green-800 border-green-200";
            case "pending":
              return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "processing":
              return "bg-blue-100 text-blue-800 border-blue-200";
            case "failed":
              return "bg-red-100 text-red-800 border-red-200";
            case "refunded":
              return "bg-purple-100 text-purple-800 border-purple-200";
            default:
              return "bg-gray-100 text-gray-800 border-gray-200";
          }
        };

        return (
          <Badge
            variant="secondary"
            className={`${getStatusColor(status)} font-medium`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at") as string);
        return (
          <div className="text-sm text-gray-600">
            {format(date, "MMM dd, yyyy")}
            <div className="text-xs text-gray-500">{format(date, "HH:mm")}</div>
          </div>
        );
      },
    },
  ];

  const handlePreviousPage = () => {
    if (transactionsData?.previous) {
      updatePage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (transactionsData?.next) {
      updatePage(page + 1);
    }
  };

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Error loading transactions
              </h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error loading the transactions data. Please try
                again.
              </p>
            </div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Transactions
            </h1>
            <p className="text-gray-600">
              Manage and view all transactions in your system
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CreditCard className="h-5 w-5" />
            <span>{transactionsData?.count || 0} total transactions</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by customer name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[180px] bg-white border-gray-300">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {TRANSACTION_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          </div>
        ) : transactionsData?.results?.length ? (
          <>
            <DataTable
              key={`${page}-${search}-${statusFilter}`}
              columns={columns}
              data={transactionsData.results}
              showPagination={false}
              pageSize={transactionsData.results.length}
            />

            {/* Custom Pagination */}
            <div className="flex items-center justify-between bg-white px-6 py-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-700">
                <span className="font-medium">
                  {transactionsData.count || 0}
                </span>{" "}
                total transactions
                {hasActiveFilters && (
                  <span className="text-gray-500 ml-1">(filtered)</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={!transactionsData.previous}
                  className="text-gray-600 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-gray-700 px-2">Page {page}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={!transactionsData.next}
                  className="text-gray-600 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="flex flex-col items-center">
              <CreditCard className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                No transactions found
              </p>
              <p className="text-sm text-gray-600">
                {hasActiveFilters
                  ? "No transactions match your current filters"
                  : "No transactions have been processed yet"}
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-4 text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTransactions;
