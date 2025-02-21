import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Switch,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Box,
} from "@mui/material";
import { FormElementProps } from "@/common/types/types";

interface ToggleElementProps extends FormElementProps {
  label: string;
  isDisabled?: boolean;
}

const ToggleElementComponent: React.FC<ToggleElementProps> = ({
  label,
  name,
  isDisabled,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl component="fieldset" fullWidth error={!!errors[name]}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <FormLabel
          component="legend"
          sx={{
            fontWeight: "600",
            fontSize: "16px",
            color: "text.primary",
            marginRight: 2,
            textAlign: "left",
            letterSpacing: "0.5px",
            width: "auto",
          }}
        >
          {label}
        </FormLabel>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={isDisabled}
                  color="primary"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#3f51b5",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#3f51b5",
                    },
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    borderRadius: "20px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                />
              }
              label=""
              labelPlacement="start"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
              }}
            />
          )}
        />
      </Box>

      {errors[name] && (
        <FormHelperText
          error
          sx={{
            fontSize: "14px",
            textAlign: "left",
            paddingTop: "8px",
            fontWeight: "500",
          }}
        >
          {errors[name]?.message?.toString()}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default ToggleElementComponent;
