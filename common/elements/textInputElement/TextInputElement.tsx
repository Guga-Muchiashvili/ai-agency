import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormElementProps } from "@/common/types/types";

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
      render={() => (
        <input
          id="email"
          type="password"
          name="email"
          placeholder={label}
          className="text-sm sm:text-base py-3 sm:py-4 md:py-6 w-full pl-2.5 sm:pl-3 md:pl-5 outline-none block ease-in-out rounded-md pr-3 border-2 border-[#c3c6d4] bg-[#F5F5F5] sm:h-[55px] focus:bg-white duration-300 focus:border-secondary"
        />
      )}
    />
  );
};

export default TextFieldElementComponent;
