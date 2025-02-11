import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = (
  string: string | undefined | null,
  slice: number = 30
): string => {
  if (!string) {
    return "..."; // Return a fallback string if `string` is nullish
  }
  return string.slice(0, slice) + "...";
};
