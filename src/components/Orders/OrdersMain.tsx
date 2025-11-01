import OrdersRow from "./OrdersRow";

const OrdersMain = ({ reports }: { reports: any }) => {
  if (reports.length === 0)
    return (
      <div className="w-[90%] md:max-w-lg mx-auto py-10 px-10 md:w-full flex flex-col">
        <div className="text-center text-base">No reports found</div>
      </div>
    );
  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto py-10 px-10 flex flex-col gap-4">
      {reports.map((report: any) => (
        <OrdersRow report={report} key={report.id} />
      ))}
    </div>
  );
};

export default OrdersMain;
