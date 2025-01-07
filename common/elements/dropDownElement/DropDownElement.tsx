import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormElementProps } from "@/common/types/types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DropdownFieldElement: React.FC<
  FormElementProps & { options: string[] | undefined }
> = ({ label, name, options }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth margin="normal">
          <InputLabel>{label}</InputLabel>
          <Select {...field} label="Worker">
            {options?.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default DropdownFieldElement;
