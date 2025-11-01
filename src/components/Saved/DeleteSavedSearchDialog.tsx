import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogProps } from "@/types/types";
import { useDeleteSavedSearch } from "@/services/saveSearch";
import { SavedSearch } from "@/types/saveSearchTypes";

interface DeleteSavedSearchDialogProps extends DialogProps {
  locationSet: SavedSearch;
}

export const DeleteSavedSearchDialog = (
  props: DeleteSavedSearchDialogProps
) => {
  const { open, setOpen, locationSet } = props;
  const {
    mutate: deleteSavesSearch,
    isPending: isDeleteSaveSearchLoading,
    isSuccess: isDeleteSuccess,
  } = useDeleteSavedSearch();
  const handleDelete = () => {
    deleteSavesSearch(locationSet?.id);
  };
  useEffect(() => {
    if (isDeleteSuccess) {
      setOpen(false);
    }
  }, [isDeleteSuccess]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="rounded-2xl p-0 w-4xl  md:min-w-2xl sm:min-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b px-8 pt-8 pb-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              Delete Save Search
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="border-b px-8 py-4  text-sm text-black pb-14">
          <p>
            Are you sure you want to delete your saved search{" "}
            <span className="font-semibold">{locationSet?.name}?</span>
          </p>
        </div>
        <div className="flex justify-end px-8 pb-4 gap-2">
          <Button
            onClick={() => setOpen(false)}
            className="bg-gray-400 text-white cursor-pointer text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-base-green  text-white cursor-pointer text-sm"
          >
            {isDeleteSaveSearchLoading ? (
              <Loader2
                className="w-4 h-4 md:w-6 md:h-6 text-white animate-spin"
                strokeWidth={2}
              />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
