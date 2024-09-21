import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CustomDropDownProps, Option } from "./interface";

const CustomDropDown: React.FC<CustomDropDownProps> = ({ label, onSelect, value, options }: CustomDropDownProps) => {

    return (
        <FormControl sx={{width:"50%" }} className="dropdown-container">
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={onSelect}>
                {options.map((option: Option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomDropDown;