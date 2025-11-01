import { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { InfoDialog } from "../InfoDialog/InfoDialog";

interface InfoIconProps extends React.SVGProps<SVGSVGElement> {
  label: string;
  description: string;
  tooltipText?: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({
  className,
  tooltipText,
  label,
  description,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Info
        className={cn("h-3 w-3 text-base-green cursor-pointer", className)}
        {...props}
        onClick={() => {
          setOpen(true);
        }}
      />
      <InfoDialog
        label={label}
        description={description}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
