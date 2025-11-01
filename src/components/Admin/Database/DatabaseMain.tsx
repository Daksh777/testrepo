import { useGetAllDatabase } from "@/services/adminServices";
import { Button } from "@/components/ui/button";
import DatabaseRow from "./DatabaseRow";
import {
  Database,
  File,
  Loader2,
  AlertCircle,
  HardDrive,
  Upload,
} from "lucide-react";

interface DatabaseFile {
  filename: string;
  url: string;
  size: number;
}

interface DatabaseResponse {
  [key: string]: DatabaseFile[];
}

const DatabaseMain = () => {
  const { data, isFetching, error, refetch } = useGetAllDatabase();
  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Error loading database files
              </h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error loading the database files. Please try again.
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
              Database Files
            </h1>
            <p className="text-gray-600">
              Manage and download system database files by category
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <HardDrive className="h-5 w-5" />
              <span>{data ? Object.keys(data).length : 0} categories</span>
            </div>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <Database className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Database Files Table */}
      <div className="space-y-4">
        {isFetching ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-600">
                Loading database files...
              </span>
            </div>
          </div>
        ) : data && Object.keys(data).length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(data as DatabaseResponse).map(
                    ([category, files]) => {
                      return (
                        <DatabaseRow
                          key={category}
                          category={category}
                          files={files}
                        />
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="flex flex-col items-center">
              <File className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                No database files found
              </p>
              <p className="text-sm text-gray-600">
                There are no database files available at the moment
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {data && Object.keys(data).length > 0 && (
        <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Summary</h3>
          <div className="text-sm text-blue-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="font-semibold">Total Categories:</span>{" "}
                {Object.keys(data).length}
              </div>
              <div>
                <span className="font-semibold">Available Files:</span>{" "}
                {
                  Object.values(data as DatabaseResponse).filter(
                    (files) => files.length > 0
                  ).length
                }
              </div>
              <div>
                <span className="font-semibold">Total Files:</span>{" "}
                {Object.values(data as DatabaseResponse).reduce(
                  (total, files) => total + files.length,
                  0
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Operations Info */}
      <div className="mt-4 bg-yellow-50 rounded-lg border border-yellow-200 p-4">
        <div className="flex items-start">
          <Upload className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">
              File Management
            </h4>
            <p className="text-sm text-yellow-700 mt-1">
              You can upload new files to any category or remove existing files.
              Supported formats: CSV, JSON, TXT, XLSX, XLS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseMain;
