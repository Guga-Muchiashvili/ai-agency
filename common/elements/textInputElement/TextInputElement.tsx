import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormElementProps } from "@/common/types/types";
import { TextField } from "@mui/material";

interface TextFieldElementProps extends FormElementProps {
  isDisabled?: boolean;
  textFieldProps?: TextFieldElementProps;
  startAdornment?: React.ReactNode;
}

const TextFieldElementComponent: React.FC<TextFieldElementProps> = ({
  label,
  name,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type="text"
          fullWidth
          variant="outlined"
          margin="normal"
        />
      )}
    />
  );
};

export default TextFieldElementComponent;
