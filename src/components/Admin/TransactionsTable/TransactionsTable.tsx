import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable/DataTable";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  user_email: string;
  status: string;
  amount_total_display: string;
  created_at: string;
}

interface TransactionsTableProps {
  data: Transaction[];
  isLoading?: boolean;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  data,
  isLoading,
}) => {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => (
        <div className="font-mono text-xs">
          {row.getValue("id")?.toString().substring(0, 8)}...
        </div>
      ),
    },
    {
      accessorKey: "user_email",
      header: "User Email",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("user_email")}</div>
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
            case "failed":
              return "bg-red-100 text-red-800 border-red-200";
            case "cancelled":
              return "bg-gray-100 text-gray-800 border-gray-200";
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
      accessorKey: "amount_total_display",
      header: "Amount",
      cell: ({ row }) => (
        <div className="font-semibold text-gray-900">
          {row.getValue("amount_total_display")}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(
          row.getValue("created_at") as string
        ).toUTCString();
        return (
          <div className="text-sm text-gray-600">{date.substring(4, 26)}</div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h3>
          <p className="text-sm text-gray-600">
            Last 20 transactions in your system
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        pageSize={20}
        showPagination={data.length > 20}
      />
    </div>
  );
};

export default TransactionsTable;
