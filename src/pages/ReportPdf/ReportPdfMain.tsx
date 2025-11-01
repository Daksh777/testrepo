import Page1 from "@/components/ReportPdf/Page1/Page1";
// import { useGetFullReportData } from "@/services/report";
// import { useParams, useSearchParams } from "react-router";
import Page2 from "@/components/ReportPdf/Page2/Page2";
import Page3 from "@/components/ReportPdf/Page3/Page3";
import Page4 from "@/components/ReportPdf/Page4/Page4";
import Page5 from "@/components/ReportPdf/Page5/Page5";
import Page6 from "@/components/ReportPdf/Page6/Page6";
import Page7 from "@/components/ReportPdf/Page7/Page7";
import Page8 from "@/components/ReportPdf/Page8/Page8";
import Page9 from "@/components/ReportPdf/Page9/Page9";
import Page10 from "@/components/ReportPdf/Page10/Page10";
import Page11 from "@/components/ReportPdf/Page11/Page11";
import { useParams, useSearchParams } from "react-router";
import {
  useGetFullReportData,
  // useGetFullReportDataEC2,
} from "@/services/report";

const ReportPdfMain = () => {
  const { report_id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { data, error } = useGetFullReportData(report_id || "", token || "");
  // const { data, error } = useGetFullReportDataEC2(report_id || "", token || "");
  const reportData = data?.[0];
  const reportDataError = data?.[1] || error;

  if (reportDataError) {
    return <div>{JSON.stringify(reportDataError)}</div>;
  }

  if (!reportData) {
    return null;
  }

  return (
    <div className="font-montserrat">
      <Page1 pageData={reportData} />
      <Page2 pageData={reportData} />
      <Page3 pageData={reportData} />
      <Page4 pageData={reportData} />
      <Page5 pageData={reportData} />
      <Page6 pageData={reportData} />
      <Page7 pageData={reportData} />
      <Page8 pageData={reportData} />
      <Page9 pageData={reportData} />
      <Page10 pageData={reportData} />
      <Page11 pageData={reportData} />
    </div>
  );
};

export default ReportPdfMain;
