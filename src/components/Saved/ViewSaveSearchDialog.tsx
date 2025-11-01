import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogProps } from "@/types/types";
import Comapare from "../Preference/Comapare";
import { SavedSearch } from "@/types/saveSearchTypes";

interface ViewSaveSearchDialogProps extends DialogProps {
  locationSet: SavedSearch;
}

export const ViewSaveSearchDialog = (props: ViewSaveSearchDialogProps) => {
  const { open, setOpen, locationSet } = props;
  const userPreferencesRef = useRef(locationSet?.search_parameters);
  useEffect(() => {
    if (open) {
      userPreferencesRef.current = locationSet?.search_parameters;
    }
  }, [locationSet, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="rounded-2xl p-0 w-4xl  md:min-w-3xl sm:min-w-xl max-h-[90vh] overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b px-8 pt-8 pb-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              View saved search
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className=" text-sm text-black px-8 py-4">
          <div>
            <span className="text-black font-semibold block text-base">
              Name
            </span>
            <p className="block text-xl font-semibold py-1 outline-none text-gray-500 w-full">
              {locationSet?.name}
            </p>
          </div>
          <span className="text-black font-semibold block text-base mt-4">
            Searched Criteria
          </span>
          <Comapare
            display_name={null}
            preferencesMetadData={null}
            userPreferencesRef={userPreferencesRef}
            readonly={true}
          />
        </div>
        <div className="flex justify-end px-8 pb-4 gap-2">
          <Button
            onClick={() => setOpen(false)}
            className="bg-gray-400 text-white cursor-pointer text-sm"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
