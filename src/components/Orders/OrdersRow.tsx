import { useGetDownloadReport } from "@/services/report";
import { THUMBNAIL_BASE_URL } from "@/shared";
import { format } from "date-fns";
import { Barcode, Calendar, Download, Loader2, X } from "lucide-react";
import { toast } from "sonner";

const OrderStatus = ({
  status,
  onDownloadReport,
  isDownloading,
}: {
  status: string;
  onDownloadReport: () => void;
  isDownloading: boolean;
}) => {
  if (status === "QUEUED")
    return (
      <div className="text-xs font-semibold bg-gray-500 text-white rounded-lg px-3 py-2 flex flex-row gap-2 items-center shadow-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="hidden sm:inline">Queued</span>
        <span className="sm:hidden">{status}</span>
      </div>
    );
  if (status === "FAILED")
    return (
      <div className="text-xs font-semibold bg-red-500 text-white rounded-lg px-3 py-2 flex flex-row gap-2 items-center shadow-sm">
        <X className="w-4 h-4" />
        <span className="hidden sm:inline">Failed</span>
        <span className="sm:hidden">{status}</span>
      </div>
    );
  if (status === "PROCESSING")
    return (
      <div className="text-xs font-semibold bg-yellow-500 text-white rounded-lg px-3 py-2 flex flex-row gap-2 items-center shadow-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="hidden sm:inline">
          We're putting together your information
        </span>
        <span className="sm:hidden">Processing</span>
      </div>
    );
  if (status === "COMPLETED")
    return (
      <div
        className="text-xs font-semibold bg-base-green text-white rounded-lg px-3 py-2 flex flex-row gap-2 items-center cursor-pointer shadow-sm hover:shadow-md hover:bg-green-600 transition-all duration-200"
        onClick={onDownloadReport}
      >
        {isDownloading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">Download</span>
        <span className="sm:hidden">Ready</span>
      </div>
    );
};

const OrdersRow = ({ report }: { report: any }) => {
  const { mutateAsync: getDownloadReport, isPending: isDownloading } =
    useGetDownloadReport(report.id);
  const onDownloadReport = () => {
    getDownloadReport({})
      .then((res) => {
        // how can change the file name to the neighborhood name
        const neighborhoodName = report.neighborhood_id;
        const fileName = `${neighborhoodName}.pdf`;
        const link = document.createElement("a");
        link.href = res.download_url;
        link.download = fileName;
        link.click();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to download report");
      });
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row gap-4 hover:border-gray-300">
      {/* Report Preview */}
      <div className="h-16 w-full sm:h-20 sm:w-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
        <img
          src={`${THUMBNAIL_BASE_URL}${report.neighborhood_id}.webp`}
          alt="Report"
          className="w-full h-full object-fill "
        />
      </div>

      {/* Report Details */}
      <div className="flex flex-col grow gap-2 overflow-hidden min-w-0">
        <div className="text-base sm:text-lg font-semibold text-primary-blue truncate">
          {report.neighborhood_name}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="flex flex-row gap-2 items-center text-xs text-gray-500">
            <Calendar className="w-4 h-4 shrink-0" />
            <div className="whitespace-nowrap">
              {format(new Date(report.created_at), "dd MMM yyyy")}
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center text-xs text-gray-500 min-w-0">
            <Barcode className="w-4 h-4 shrink-0" />
            <div className="truncate font-mono">{report.neighborhood_id}</div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="shrink-0 flex justify-end sm:justify-start sm:items-start">
        <OrderStatus
          status={report.status}
          onDownloadReport={onDownloadReport}
          isDownloading={isDownloading}
        />
      </div>
    </div>
  );
};

export default OrdersRow;
