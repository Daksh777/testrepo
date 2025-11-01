import { Plan } from "@/types/types";

const PricingCard = ({ selectedPlan }: { selectedPlan: Plan }) => {
  return (
    <div className="py-6 px-8 bg-white rounded-md border-2 border-base-green w-full text-primary-blue shadow-md shadow-base-green/50 ">
      <div className="flex flex-row items-end-safe gap-4">
        <div className="text-4xl md:text-6xl font-semibold mt-4 text-[#004aad]">
          £ {selectedPlan.price}
        </div>
        <div className="text-sm md:text-xl font-semibold">one time payment</div>
      </div>
      <div className="h-[4px] w-full bg-gray-200 my-6"></div>
      <div className="flex flex-col text-gray-500 text-xs md:text-sm gap-1">
        <div className="flex flex-row items-center gap-2 ">
          <div>Pass:</div>
          <div>{selectedPlan.name}</div>
        </div>
        <div className="flex flex-row items-center gap-2 ">
          <div>Searches:</div>
          <div>{selectedPlan.no_of_searches || "Unlimited"}</div>
        </div>
        <div className="flex flex-row items-center gap-2 ">
          <div>Neighborhoods Profile Downloads:</div>
          <div>{selectedPlan.no_of_neighborhood_profiles || "Unlimited"}</div>
        </div>
        <div className="flex flex-row items-center gap-2 ">
          <div>Additional Neighborhoods Profile:</div>
          <div>£ {selectedPlan.additional_report_price}</div>
        </div>
        <div className="flex flex-row items-center gap-2 ">
          <div>Users:</div>
          <div>1</div>
        </div>
        <div className="text-xs text-gray-500 mt-4">
          * fair use policy applies
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
