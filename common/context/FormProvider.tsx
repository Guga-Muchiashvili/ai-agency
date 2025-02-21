import React from "react";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";
import { IFormLead } from "../types/types";
import { FormValues } from "@/components/ModelDashboardComponent/types";

export interface FormComponentProps<T extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  submit: React.FormEventHandler<HTMLFormElement>;
}

const FormComponent = <T extends IFormLead | FormValues>({
  children,
  methods,
  submit,
}: FormComponentProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={submit}>{children}</form>
    </FormProvider>
  );
};

export default FormComponent;
