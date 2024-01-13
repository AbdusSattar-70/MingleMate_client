import { CSSProperties } from "react";

export interface ColourOption {
  value: string;
  label: string;
  color: string;
}

export const colourOptions: ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#FF8B00" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export interface GroupedOption {
  label: string;
  options: ColourOption[];
}

export const groupedOptions: GroupedOption[] = [
  {
    label: "Colours",
    options: colourOptions,
  },
];

export const searchInputStyles = {
  loadingMessage: (base: CSSProperties) => ({
    ...base,
    backgroundColor: "#00B8D9",
    color: "white",
  }),
  placeholder: (base: CSSProperties) => ({
    ...base,
    color: "white",
  }),
  input: (base: CSSProperties) => ({
    ...base,
    color: "white",
  }),
  singleValue: (base: CSSProperties) => ({
    ...base,
    color: "white",
  }),
  container: (base: CSSProperties) => ({
    ...base,
    transition: "width 1s ease-in-out",
    backgroundColor: "#313D4A",
    color: "white",
  }),
  control: (base: CSSProperties) => ({
    ...base,
    backgroundColor: "#313D4A",
    color: "white",
  }),
  menu: (base: CSSProperties) => ({
    ...base,
    backgroundColor: "#313D4A",
    color: "white",
  }),
};
