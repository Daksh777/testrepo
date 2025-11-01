import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useGetAllReports, useGetSingleReport } from "@/services/adminServices";
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
  FileText,
  Loader2,
  AlertCircle,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { format } from "date-fns";

interface ReportUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  date_joined: string;
}

interface Report {
  id: string;
  user: ReportUser;
  neighborhood_id: string;
  status: string;
  data: Record<string, any>;
  filename: string;
  file_url: string | null;
  task_id: string;
  created_at: string;
  updated_at: string;
}

const REPORT_STATUSES = [
  { value: "All Statuses", label: "All Statuses" },
  { value: "QUEUED", label: "Queued" },
  { value: "PROCESSING", label: "Processing" },
  { value: "COMPLETED", label: "Completed" },
  { value: "FAILED", label: "Failed" },
];

const Reports = () => {
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
    data: reportsData,
    isLoading,
    error,
  } = useGetAllReports(page, search, statusFilter);

  const { mutateAsync: getSingleReport } = useGetSingleReport();

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

  const handleDownloadReport = async (report: Report) => {
    const reportData = await getSingleReport({ id: report.id });
    if (reportData.file_url) {
      window.open(reportData.file_url, "_blank");
    }
  };

  const columns: ColumnDef<Report>[] = [
    {
      accessorKey: "id",
      header: "Report ID",
      cell: ({ row }) => (
        <div className="font-mono text-xs text-gray-600">
          {row.getValue("id")?.toString().substring(0, 8)}...
        </div>
      ),
    },
    {
      accessorKey: "user",
      header: "User",
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
      accessorKey: "neighborhood_id",
      header: "Neighborhood",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">
          {row.getValue("neighborhood_id")}
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
            case "queued":
              return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "processing":
              return "bg-blue-100 text-blue-800 border-blue-200";
            case "failed":
              return "bg-red-100 text-red-800 border-red-200";
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
      header: "Created",
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
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const report = row.original;
        const isCompleted = report.status === "COMPLETED";

        return (
          <div className="flex items-center space-x-2">
            {isCompleted && report.file_url && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadReport(report)}
                  className="text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </>
            )}
            {!isCompleted && <div>-</div>}
          </div>
        );
      },
    },
  ];

  const handlePreviousPage = () => {
    if (reportsData?.previous) {
      updatePage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (reportsData?.next) {
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
                Error loading reports
              </h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error loading the reports data. Please try again.
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600">
              Manage and view all reports generated by users
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="h-5 w-5" />
            <span>{reportsData?.count || 0} total reports</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by user name, email"
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
                {REPORT_STATUSES.map((status) => (
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

      {/* Reports Table */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          </div>
        ) : reportsData?.results?.length ? (
          <>
            <DataTable
              key={`${page}-${search}-${statusFilter}`}
              columns={columns}
              data={reportsData.results}
              showPagination={false}
              pageSize={reportsData.results.length}
            />

            {/* Custom Pagination */}
            <div className="flex items-center justify-between bg-white px-6 py-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{reportsData.count || 0}</span>{" "}
                total reports
                {hasActiveFilters && (
                  <span className="text-gray-500 ml-1">(filtered)</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={!reportsData.previous}
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
                  disabled={!reportsData.next}
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
              <FileText className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                No reports found
              </p>
              <p className="text-sm text-gray-600">
                {hasActiveFilters
                  ? "No reports match your current filters"
                  : "No reports have been generated yet"}
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

export default Reports;
