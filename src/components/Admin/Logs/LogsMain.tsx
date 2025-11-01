import { useState, useMemo } from "react";
import { useGetAllLogs } from "@/services/adminServices";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  AlertCircle,
  FileText,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";

interface LogEntry {
  task_id: number;
  created_at: string;
  updated_at: string;
  status: string;
  task_type: string;
  progress_message: string;
}

const LogsMain = () => {
  const { data, isFetching, error, refetch } = useGetAllLogs();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logs based on search term
  const filteredLogs = useMemo(() => {
    if (!data) return [];

    return data.filter(
      (log: LogEntry) =>
        log.task_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.progress_message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.task_id.toString().includes(searchTerm)
    );
  }, [data, searchTerm]);

  const getStatusConfig = (status: string) => {
    switch (status.toUpperCase()) {
      case "SUCCESS":
        return {
          className: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
        };
      case "FAILED":
        return {
          className: "bg-red-100 text-red-800 border-red-200",
          icon: <XCircle className="h-3 w-3 mr-1" />,
        };
      case "STARTED":
        return {
          className: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Loader2 className="h-3 w-3 mr-1 animate-spin" />,
        };
      default:
        return {
          className: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Activity className="h-3 w-3 mr-1" />,
        };
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: format(date, "MMM dd, yyyy"),
      time: format(date, "HH:mm:ss"),
    };
  };

  const getTaskTypeDisplayName = (taskType: string) => {
    return taskType
      .replace(/Import of /g, "")
      .replace(/ data/g, "")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Error loading logs
              </h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error loading the import logs. Please try again.
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
              Import Logs
            </h1>
            <p className="text-gray-600">
              View and monitor import status logs for database operations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Activity className="h-5 w-5" />
              <span>
                {filteredLogs.length}{" "}
                {filteredLogs.length === 1 ? "log" : "logs"}
              </span>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search logs by task type, message, status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="space-y-4">
        {isFetching ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-600">Loading logs...</span>
            </div>
          </div>
        ) : filteredLogs.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLogs.map((log: LogEntry) => {
                    const statusConfig = getStatusConfig(log.status);
                    const createdAt = formatDateTime(log.created_at);
                    const updatedAt = formatDateTime(log.updated_at);

                    return (
                      <tr key={log.task_id} className="hover:bg-gray-50">
                        {/* Task ID */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm font-mono text-gray-900">
                              #{log.task_id}
                            </span>
                          </div>
                        </td>

                        {/* Task Type */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {getTaskTypeDisplayName(log.task_type)}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant="secondary"
                            className={`font-medium ${statusConfig.className}`}
                          >
                            {statusConfig.icon}
                            {log.status}
                          </Badge>
                        </td>

                        {/* Created At */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                              {createdAt.date}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 text-gray-400 mr-1" />
                              {createdAt.time}
                            </div>
                          </div>
                        </td>

                        {/* Updated At */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                              {updatedAt.date}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 text-gray-400 mr-1" />
                              {updatedAt.time}
                            </div>
                          </div>
                        </td>

                        {/* Progress Message */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            <div
                              className="truncate"
                              title={log.progress_message}
                            >
                              {log.progress_message}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="flex flex-col items-center">
              <Activity className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                No logs found
              </p>
              <p className="text-sm text-gray-600">
                {searchTerm
                  ? `No logs match "${searchTerm}"`
                  : "No import logs are available at the moment"}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status Legend */}
      {filteredLogs.length > 0 && (
        <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-3">
            Status Legend
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-blue-800">
                Success - Completed successfully
              </span>
            </div>
            <div className="flex items-center">
              <XCircle className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-blue-800">Failed - Operation failed</span>
            </div>
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-blue-800">Running - In progress</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
              <span className="text-blue-800">
                Warning - Completed with warnings
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogsMain;
