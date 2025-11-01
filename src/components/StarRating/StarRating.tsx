import React from "react";
import { Rating } from "react-simple-star-rating";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  readonly?: boolean;
  onChange?: (value: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  className,
  readonly = false,
  onChange,
}) => {
  const fillColor = readonly ? "#fee685" : "#FFC107";

  return (
    <div className={cn("flex items-center", className)}>
      <Rating
        initialValue={rating}
        allowFraction
        readonly={readonly}
        onClick={(value) => {
          if (!readonly && onChange) {
            onChange(value);
          }
        }}
        size={size}
        fillColor={fillColor}
        className="leading-none"
        SVGclassName="inline" //make horizontal
      />
    </div>
  );
};
