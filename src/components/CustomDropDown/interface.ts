import { SelectChangeEvent } from "@mui/material";

export interface Option {
  value: string;
  label: string;
}

export interface CustomDropDownProps {
  label: string;
  value: string;
  onSelect: (event: SelectChangeEvent<string>) => void;
  options: Option[];
}
