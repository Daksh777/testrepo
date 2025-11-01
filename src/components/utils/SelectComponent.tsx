import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
const SelectComponent = ({
  triggerClassName,
  contentClassName,
  placeholder,
  options,
  onValueChange,
  defaultValue,
  ...props
}: {
  triggerClassName?: string;
  contentClassName?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}) => {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      {...props}
    >
      <SelectTrigger className={cn(triggerClassName, "w-[180px] outline-none")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn(contentClassName)}>
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
