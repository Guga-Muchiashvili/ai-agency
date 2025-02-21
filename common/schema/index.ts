import * as yup from "yup";

export const PaymentSchema = () => {
  return yup.object({
    name: yup.string().required("Name is required"),
    status: yup
      .mixed<"completed" | "hold" | "balance">()
      .oneOf(["completed", "hold", "balance"])
      .required(),
    worker: yup.string().required("Worker is required"),
    date: yup.string().required("Date is required"),
    amount: yup
      .number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    percentage: yup
      .number()
      .required("Percentage is required")
      .min(0, "Percentage cannot be negative")
      .max(100, "Percentage cannot be greater than 100"),
    total: yup
      .number()
      .required("Total is required")
      .positive("Total must be positive"),
  });
};

export const LeadSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  img: yup
    .string()
    .url("Image URL is invalid")
    .required("Image URL is required"),
  modelId: yup
    .array()
    .of(yup.string().required("Model ID is required"))
    .min(1, "At least one model ID is required")
    .required("Model is required"),
  workerId: yup.string().required("Worker ID is required"),
  active: yup.boolean().required("Active status is required"),
  seen: yup.boolean().required("Seen status is required"),
  description: yup.string(),
});
