import { useGetAllPasses } from "@/services/adminServices";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Edit,
  Loader2,
  AlertCircle,
  CreditCard,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";

interface Pass {
  id: number;
  name: string;
  validity_duration: string;
  price: string;
  no_of_searches: number | null;
  no_of_neighborhood_profiles: number;
  additional_report_price: string;
  active: boolean;
}

const ShowAllPasses = () => {
  const { data, isLoading, error } = useGetAllPasses();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // Filter passes based on search term
  const filteredPasses =
    data?.results?.filter((pass: Pass) =>
      pass.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const columns: ColumnDef<Pass>[] = [
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
      accessorKey: "name",
      header: "Pass Name",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="font-semibold text-gray-900">
          £{row.getValue("price")}
        </div>
      ),
    },
    {
      accessorKey: "validity_duration",
      header: "Validity",
      cell: ({ row }) => {
        const duration = row.getValue("validity_duration") as string;
        const days = duration.split(" ")[0];
        return <div className="text-gray-900">{days} days</div>;
      },
    },
    {
      accessorKey: "no_of_neighborhood_profiles",
      header: "Profiles",
      cell: ({ row }) => (
        <div className="text-gray-900">
          {row.getValue("no_of_neighborhood_profiles")}
        </div>
      ),
    },
    {
      accessorKey: "no_of_searches",
      header: "Searches",
      cell: ({ row }) => {
        const searches = row.getValue("no_of_searches") as number | null;
        return (
          <div className="text-gray-900">
            {searches ? searches : "Unlimited"}
          </div>
        );
      },
    },
    {
      accessorKey: "additional_report_price",
      header: "Additional Report",
      cell: ({ row }) => (
        <div className="text-gray-900">
          £{row.getValue("additional_report_price")}
        </div>
      ),
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("active") as boolean;
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleEdit(row.original)}
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (pass: Pass) => {
    navigate(`/admin/passes/new?editPassId=${pass.id}`);
  };

  const handleAddNew = () => {
    navigate("/admin/passes/new");
  };

  const handleAssignPass = () => {
    navigate("/admin/passes/assign");
  };

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Error loading passes
              </h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error loading the passes data. Please try again.
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
              Subscription Passes
            </h1>
            <p className="text-gray-600">
              Manage all active subscription passes available for users
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CreditCard className="h-5 w-5" />
              <span>{data?.count || filteredPasses.length} total passes</span>
            </div>

            <Button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Pass
            </Button>
            <Button
              onClick={handleAssignPass}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Assign Pass
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
              placeholder="Search passes by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Passes Table */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          </div>
        ) : filteredPasses.length ? (
          <DataTable
            columns={columns}
            data={filteredPasses}
            showPagination={false}
            pageSize={filteredPasses.length}
          />
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="flex flex-col items-center">
              <CreditCard className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                No passes found
              </p>
              <p className="text-sm text-gray-600">
                {searchTerm
                  ? `No passes match "${searchTerm}"`
                  : "Get started by adding your first pass"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={handleAddNew}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Pass
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowAllPasses;
