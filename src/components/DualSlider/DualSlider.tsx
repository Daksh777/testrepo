import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  label?: (value: number | undefined) => React.ReactNode;
  formatValue?: (value: number | undefined) => string;
}

export const DualRangeSlider = React.forwardRef<
  HTMLDivElement,
  DualRangeSliderProps
>(({ className, label, formatValue, ...props }, ref) => {
  const initialValue = Array.isArray(props.value)
    ? props.value
    : [props.min, props.max];

  return (
    <div className="w-full relative">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-muted-foreground bg-white dark:bg-gray-900 rounded shadow-sm whitespace-nowrap px-2 py-0.5">
          {formatValue ? formatValue(initialValue?.[0]) : initialValue?.[0]}
        </span>
        <span className="text-muted-foreground bg-white dark:bg-gray-900 rounded shadow-sm whitespace-nowrap px-2 py-0.5">
          {formatValue ? formatValue(initialValue?.[1]) : initialValue?.[1]}
        </span>
      </div>

      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <SliderPrimitive.Range className="absolute h-full bg-gray-400 dark:bg-gray-500 rounded-full" />
        </SliderPrimitive.Track>

        {initialValue.map((_value, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="z-10 h-4 w-4 rounded-full border border-gray-400 bg-white dark:bg-gray-900 shadow-sm ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 cursor-pointer flex items-center justify-center"
          ></SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    </div>
  );
});
