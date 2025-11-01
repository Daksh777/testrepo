import OrdersMain from "@/components/Orders/OrdersMain";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import { useGetAllReports } from "@/services/profileServices";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const UserOrderMain = () => {
  const [page, setPage] = useState(1);
  const { data: reports, isPending: isLoadingReports } = useGetAllReports(page);
  const handlePreviousPage = () => {
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-base-secondary flex-col">
      <div className="bg-primary-blue h-fit px-10 md:px-20 w-full py-4">
        <div className="text-white text-3xl font-semibold text-center">
          Neighborhood Profiles
        </div>
      </div>
      {isLoadingReports || !reports?.results ? (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <OrdersMain reports={reports?.results} />
          <div className="flex justify-between items-center px-10 md:px-20 w-full pb-4">
            {reports?.previous && (
              <Button
                className="bg-primary-blue text-white cursor-pointer hover:bg-primary-blue/80"
                onClick={handlePreviousPage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            {reports?.next && (
              <Button
                className="bg-primary-blue text-white cursor-pointer hover:bg-primary-blue/80"
                onClick={handleNextPage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrderMain;
