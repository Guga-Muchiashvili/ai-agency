import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { FormElementProps } from "@/common/types/types";

interface TextFieldElementProps extends FormElementProps {
  isDisabled?: boolean;
}

const TextFieldElementComponent: React.FC<TextFieldElementProps> = ({
  label,
  name,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
          error={!!errors[name]}
          helperText={errors[name]?.message?.toString() || ""}
        />
      )}
    />
  );
};

export default TextFieldElementComponent;
