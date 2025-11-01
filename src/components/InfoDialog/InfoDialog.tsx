import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InfoDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  description: string;
}

export const InfoDialog = (props: InfoDialogProps) => {
  const { label, description, open, setOpen } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl p-0 w-4xl  md:min-w-2xl sm:min-w-xl">
        <div className="border-b px-8 pt-8 pb-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-left">
              {label}
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="text-sm text-gray-600 px-8">{description}</div>
        <div className="border-t mt-4 px-8 pt-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <span>
              ⭐ means "less important," and ⭐⭐⭐⭐⭐ means "high priority."
            </span>
          </div>
        </div>
        <div className="flex justify-end px-8 pb-4">
          <Button
            onClick={() => setOpen(false)}
            className="bg-base-green hover:bg-green-700 text-white cursor-pointer"
          >
            Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
