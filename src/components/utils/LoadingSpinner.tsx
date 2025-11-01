import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-24">
      <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
    </div>
  );
};
