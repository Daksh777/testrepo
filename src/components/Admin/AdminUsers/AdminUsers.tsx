import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useGetAllUsers } from "@/services/adminServices";
import { DataTable } from "../DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Users,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router";
import useUrlState from "@/hooks/useUrlState";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
}

const AdminUsers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useUrlState({
    key: "search",
    defaultValue: "",
  });
  const [searchTerm, setSearchTerm] = useState(debouncedSearchTerm);

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: usersData,
    isLoading,
    error,
  } = useGetAllUsers(currentPage, debouncedSearchTerm);
  const navigate = useNavigate();

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-mono text-xs text-gray-600">
          #{row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "first_name",
      header: "First Name",
      cell: ({ row }) => (
        <div className="text-gray-900">{row.getValue("first_name") || "—"}</div>
      ),
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
      cell: ({ row }) => (
        <div className="text-gray-900">{row.getValue("last_name") || "—"}</div>
      ),
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("is_active") as boolean;
        return (
          <Badge
            variant="secondary"
            className={`font-medium ${
              isActive
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-red-100 text-red-800 border-red-200"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "date_joined",
      header: "Date Joined",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date_joined") as string);
        return (
          <div className="text-sm text-gray-600">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        );
      },
    },
  ];

  const handlePreviousPage = () => {
    if (usersData?.previous) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (usersData?.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowClick = (row: User) => {
    navigate(`/admin/users/${row.id}`);
  };

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <User className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading users
              </h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error loading the users data. Please try again.
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
            <p className="text-gray-600">
              Manage and view all users in your system
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-5 w-5" />
            <span>{usersData?.count || 0} total users</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by email, name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-lg border border-gray-200 ">
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          </div>
        ) : usersData?.results?.length ? (
          <>
            <DataTable
              key={`${currentPage}-${debouncedSearchTerm}`}
              columns={columns}
              data={usersData.results}
              showPagination={false}
              pageSize={usersData.results.length}
              onRowClick={handleRowClick}
            />

            {/* Custom Pagination */}
            <div className="flex items-center justify-between bg-white px-6 py-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{usersData.count || 0}</span>{" "}
                total users
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={!usersData.previous}
                  className="text-gray-600 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-gray-700 px-2">
                  Page {currentPage}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={!usersData.next}
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
              <Users className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                No users found
              </p>
              <p className="text-sm text-gray-600">
                {searchTerm
                  ? `No users match "${searchTerm}"`
                  : "Get started by adding your first user"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
