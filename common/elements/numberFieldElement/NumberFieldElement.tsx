import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormElementProps } from "@/common/types/types";
import { TextField } from "@mui/material";

interface TextFieldElementProps extends FormElementProps {
  isDisabled?: boolean;
  textFieldProps?: TextFieldElementProps;
  startAdornment?: React.ReactNode;
}

const NumberFieldElement: React.FC<TextFieldElementProps> = ({
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
          type="number"
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

export default NumberFieldElement;
