import { usePostGenerateReport } from "@/services/report";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const DownloadReportButton = ({
  text = "Download your report with all data",
  nhoodId,
}: {
  text?: string;
  nhoodId?: string;
}) => {
  const { mutateAsync: generateReport, isPending: isGeneratingReport } =
    usePostGenerateReport();
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    generateReport({ neighborhood_id: nhoodId })
      .then((res) => {
        toast.success(res?.message || "Report generation started");
        navigate(`/user/orders`);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast.error(
            "You have exceeded your neighborhood profile download quota for the current period. ! Please upgrade your plan."
          );
          return;
        }
        toast.error("Something went wrong");
      });
  };

  return (
    <div
      onClick={handleGenerateReport}
      className="w-fit bg-[#f6bc25] text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-yellow-400 transition-all duration-300 text-center"
    >
      {isGeneratingReport ? "Generating..." : text}
    </div>
  );
};

export default DownloadReportButton;
