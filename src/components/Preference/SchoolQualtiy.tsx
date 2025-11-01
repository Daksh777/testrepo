/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

const SchoolQualtiy = ({
  userPreferencesRef,
  readOnly = false,
  defaultFilters = null,
}: {
  userPreferencesRef: React.RefObject<any>;
  readOnly?: boolean;
  defaultFilters?: any;
}) => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const isDisableAll = selected["not_important"] || readOnly;

  const SingleCheckboxRow = ({
    label,
    disabled,
    dataKey,
  }: {
    label: string;
    disabled: boolean;
    dataKey: string;
  }) => {
    return (
      <div className="py-2 px-4 hover:bg-gray-50 flex flex-row items-center gap-2">
        <Checkbox
          disabled={disabled || readOnly}
          checked={selected[dataKey] ?? false}
          onCheckedChange={(checked) => {
            setSelected({ ...selected, [dataKey]: checked as boolean });
          }}
          className="border-base-green data-[state=checked]:bg-base-green data-[state=checked]:border-base-green"
        />
        <div className={cn((disabled || readOnly) && "text-gray-500")}>
          {label}
        </div>
      </div>
    );
  };

  const generateLabel = () => {
    if (selected["not_important"]) {
      return "Not Important";
    }
    const keys = Object.keys(selected).filter(
      (key) => key !== "not_important" && selected[key]
    );

    if (keys.length === 0) {
      return "School Quality";
    }
    const label: string[] = [];
    if (keys.some((key) => key.includes("primary_school"))) {
      label.push("Primary School");
    }
    if (keys.some((key) => key.includes("secondary_school"))) {
      label.push("Secondary School");
    }
    if (keys.some((key) => key.includes("state_school"))) {
      label.push("State School");
    }
    if (keys.some((key) => key.includes("private_school"))) {
      label.push("Private School");
    }
    return label.join(", ");
  };

  useEffect(() => {
    if (defaultFilters) {
      const selectedKeys: Record<string, boolean> = {};
      Object.entries(defaultFilters).forEach(([key, value]) => {
        (value as string[]).forEach((item: string) => {
          selectedKeys[`${key}$${item}`] = true;
        });
      });
      setSelected(selectedKeys);
    }
  }, [defaultFilters]);

  useEffect(() => {
    if (readOnly) return;

    if (selected["not_important"]) {
      delete userPreferencesRef.current["filters"]["primary_mode"];
      delete userPreferencesRef.current["filters"]["secondary_mode"];
      return;
    }
    const primary_mode: string[] = [];
    const secondary_mode: string[] = [];
    Object.keys(selected).forEach((key) => {
      if (key.includes("primary_school") && selected[key]) {
        primary_mode.push(key.split("$")[1]);
      }
      if (key.includes("secondary_school") && selected[key]) {
        secondary_mode.push(key.split("$")[1]);
      }
    });
    if (primary_mode.length > 0) {
      userPreferencesRef.current["filters"]["primary_mode"] = primary_mode;
    } else {
      delete userPreferencesRef.current["filters"]["primary_mode"];
    }
    if (secondary_mode.length > 0) {
      userPreferencesRef.current["filters"]["secondary_mode"] = secondary_mode;
    } else {
      delete userPreferencesRef.current["filters"]["secondary_mode"];
    }
  }, [selected]);

  return (
    <div className="w-60">
      <Popover>
        <PopoverTrigger className="text-sm border px-4 py-1 rounded-md border-gray-200 w-full flex flex-row items-center justify-between cursor-pointer">
          <div className="truncate">{generateLabel()}</div>
          <ChevronDownIcon className="w-4 h-4 ml-auto text-gray-500 shrink-0" />
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] border border-gray-200 rounded-md p-0 shadow text-sm font-light font-montserrat overflow-hidden max-h-80 overflow-y-auto">
          <SingleCheckboxRow
            label="Not Important"
            disabled={false}
            dataKey="not_important"
          />
          <div
            className={cn(
              "text-sm font-medium font-montserrat px-4 py-2 text-gray-500 bg-gray-100",
              isDisableAll && "text-gray-300 cursor-not-allowed"
            )}
          >
            Primary School Selection
          </div>
          <SingleCheckboxRow
            label="Outstanding"
            disabled={isDisableAll}
            dataKey="primary_school$Outstanding"
          />
          <SingleCheckboxRow
            label="Good"
            disabled={isDisableAll}
            dataKey="primary_school$Good"
          />
          <SingleCheckboxRow
            label="Requires Improvement"
            disabled={isDisableAll}
            dataKey="primary_school$Requires_Improvement"
          />
          <SingleCheckboxRow
            label="Inadequate"
            disabled={isDisableAll}
            dataKey="primary_school$Inadequate"
          />
          <div
            className={cn(
              "text-sm font-medium font-montserrat px-4 py-2 text-gray-500 bg-gray-100",
              isDisableAll && "text-gray-300 cursor-not-allowed"
            )}
          >
            Secondary School Selection
          </div>
          <SingleCheckboxRow
            label="Outstanding"
            disabled={isDisableAll}
            dataKey="secondary_school$Outstanding"
          />
          <SingleCheckboxRow
            label="Good"
            disabled={isDisableAll}
            dataKey="secondary_school$Good"
          />
          <SingleCheckboxRow
            label="Requires Improvement"
            disabled={isDisableAll}
            dataKey="secondary_school$Requires_Improvement"
          />
          <SingleCheckboxRow
            label="Inadequate"
            disabled={isDisableAll}
            dataKey="secondary_school$Inadequate"
          />
          <div
            className={cn(
              "text-sm font-medium font-montserrat px-4 py-2 text-gray-500 bg-gray-100",
              isDisableAll && "text-gray-300 cursor-not-allowed"
            )}
          >
            School Type
          </div>
          <SingleCheckboxRow
            label="State School"
            disabled={isDisableAll}
            dataKey="state_school"
          />
          <SingleCheckboxRow
            label="Private School"
            disabled={true}
            dataKey="private_school"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SchoolQualtiy;
