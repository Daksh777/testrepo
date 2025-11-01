import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// save to clipboard
export const saveToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
