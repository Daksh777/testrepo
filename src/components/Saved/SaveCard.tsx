import { useEffect, useState } from "react";

import { Eye, Trash2, Type } from "lucide-react";
import { DeleteSavedSearchDialog } from "./DeleteSavedSearchDialog";
import { SaveSearchDialog } from "../SaveSearchDialog/SaveSearchDialog";
import { ViewSaveSearchDialog } from "./ViewSaveSearchDialog";
import { useRenameSavedSearch } from "@/services/saveSearch";
import { SavedSearch } from "@/types/saveSearchTypes";
import { toast } from "sonner";

interface SaveCardProps {
  data: SavedSearch;
}

const SaveCard = (props: SaveCardProps) => {
  const { data } = props;
  const {
    mutate: renameSavedSearch,
    isPending: isRenameLoading,
    isSuccess: isRenameSuccess,
  } = useRenameSavedSearch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  useEffect(() => {
    if (isRenameSuccess) {
      setRenameDialogOpen(false);
    }
  }, [isRenameSuccess]);

  const handleRenameSave = (newName: string) => {
    if (newName.toLowerCase() === data?.name.toLowerCase()) {
      toast.error("Name is already exist");
      return;
    }
    renameSavedSearch({ id: data?.id, payload: { name: newName } });
  };
  return (
    <div className="relative flex flex-row rounded-md border border-gray-200  bg-white py-3 w-full justify-between items-center px-4 hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className="text-base font-semibold text-slate-800 truncate">
        {data?.name}
      </div>
      <div className="flex flex-row gap-2 shrink-0">
        {" "}
        <button
          onClick={(e) => {
            setOpenViewDialog(true);
            e.stopPropagation();
          }}
          className="flex items-center gap-2 px-2 py-1 text-sm bg-gray-300 text-gray-800 hover:bg-gray-400 rounded cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden md:block">View</span>
        </button>
        <button
          onClick={(e) => {
            setRenameDialogOpen(true);
            e.stopPropagation();
          }}
          className="flex items-center gap-2 px-2 py-1 text-sm bg-gray-300 text-gray-800 hover:bg-gray-400 rounded cursor-pointer"
        >
          <Type className="w-4 h-4" />
          <span className="hidden md:block">Rename</span>
        </button>
        <hr />
        <button
          onClick={(e) => {
            setOpenDeleteDialog(true);
            e.stopPropagation();
          }}
          className="flex items-center gap-2 px-2 py-1 text-sm bg-gray-300 text-gray-800 hover:bg-gray-400 rounded cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden md:block">Delete</span>
        </button>
      </div>

      {openDeleteDialog && (
        <DeleteSavedSearchDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          locationSet={data}
        />
      )}
      {renameDialogOpen && (
        <SaveSearchDialog
          open={renameDialogOpen}
          setOpen={setRenameDialogOpen}
          title="Rename Saved Search"
          saveButtonText="Rename"
          initialName={data?.name}
          onSave={handleRenameSave}
          isOkBtnLoading={isRenameLoading}
        />
      )}
      {openViewDialog && (
        <ViewSaveSearchDialog
          open={openViewDialog}
          setOpen={setOpenViewDialog}
          locationSet={data}
        />
      )}
    </div>
  );
};

export default SaveCard;
