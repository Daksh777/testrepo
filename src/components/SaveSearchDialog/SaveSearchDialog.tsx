import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogProps } from "@/types/types";
import { Loader2 } from "lucide-react";

interface SaveSearchDialogProps extends DialogProps {
  title: string;
  saveButtonText: string;
  onSave: (name: string) => void;
  initialName?: string;
  isOkBtnLoading?: boolean;
}

export const SaveSearchDialog = ({
  open,
  setOpen,
  title,
  saveButtonText,
  initialName = "",
  onSave,
  isOkBtnLoading,
}: SaveSearchDialogProps) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName, open]);

  const handleSave = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Please enter a name.");
      return;
    }
    onSave(trimmedName);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="rounded-2xl p-0 w-4xl md:min-w-2xl sm:min-w-xl z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b px-8 pt-8 pb-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              {title}
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="border-b px-8 py-4 ">
          <label
            className="text-black font-semibold block mb-1 text-base"
            htmlFor="save-search-name"
          >
            Search Name
          </label>
          <input
            id="save-search-name"
            type="text"
            placeholder="Name your search"
            className="block text-xl font-semibold py-1 outline-none text-gray-500 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-end px-8 pb-4 gap-2">
          <Button
            onClick={() => setOpen(false)}
            className="bg-gray-400 text-white cursor-pointer text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-base-green text-white cursor-pointer text-sm"
          >
            {isOkBtnLoading ? (
              <Loader2
                className="w-4 h-4 md:w-6 md:h-6 text-white animate-spin"
                strokeWidth={2}
              />
            ) : (
              saveButtonText
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
