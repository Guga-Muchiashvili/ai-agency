import { createEarning } from "@/api/api";
import { TransformEarningFormData } from "@/common/actions/transformData/transformData";
import FormComponent from "@/common/context/FormProvider";
import DropdownFieldElement from "@/common/elements/dropDownElement/DropDownElement";
import NumberFieldElement from "@/common/elements/numberFieldElement/NumberFieldElement";
import TextFieldElementComponent from "@/common/elements/textInputElement/TextInputElement";
import { PaymentSchema } from "@/common/schema";
import { FormValues } from "@/components/ModelDashboardComponent/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { StaticImageData } from "next/image";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import { InferType } from "yup";

const PaymentModalElement = ({
  workers,
  changeModal,
  id: ModelId,
}: {
  workers:
    | {
        name: string;
        model: string;
        profit: string;
        id: string;
        img: StaticImageData;
        profitValue: number;
      }[]
    | undefined;
  changeModal: () => void;
  id?: string;
}) => {
  const methods: UseFormReturn<FormValues> = useForm({
    resolver: yupResolver(PaymentSchema()),
    defaultValues: {
      amount: 0,
      date: "",
      name: "",
      percentage: 0,
      status: "hold",
      total: 0,
      worker: "",
    },
  });

  const {
    handleSubmit,
    formState: {},
  } = methods;

  const submit = async (event: InferType<ReturnType<typeof PaymentSchema>>) => {
    const data = TransformEarningFormData(event, workers, ModelId as string);

    const res = await createEarning({
      amount: data.amount,
      createdAt: data.createdAt,
      lead: data.lead,
      modelId: data.modelId,
      percentage: data.percentage,
      status: data.status,
      total: data.total,
      workerId: data.workerId,
    });

    console.log(res);
  };

  console.log(workers);

  const optionWorkers = workers?.map((item) => item.name);

  console.log(optionWorkers);

  return (
    <FormComponent methods={methods} submit={handleSubmit(submit)}>
      <div className="w-fit lg:w-[40vw] h-fit font-bebas p-5 py-8 text-center relative rounded-xl bg-white">
        <h1 className="text-black text-4xl">Form</h1>
        <IoIosCloseCircle
          className="text-3xl text-black absolute top-2 right-2 cursor-pointer"
          onClick={() => changeModal()}
        />
        <div className="w-full flex gap-3 items-center">
          <NumberFieldElement label="Amount" name="amount" />
          <TextFieldElementComponent label="Lead" name="name" />
        </div>
        <DropdownFieldElement
          label="Worker"
          name="worker"
          options={optionWorkers}
        />
        <div className="w-full flex gap-4 items-center">
          <TextFieldElementComponent label="Date" name="date" />
          <DropdownFieldElement
            label="Status"
            name="status"
            options={["completed", "hold", "balance"]}
          />
        </div>
        <div className="w-full flex gap-4 items-center">
          <NumberFieldElement label="Percentage" name="percentage" />
          <NumberFieldElement label="Total" name="total" />
        </div>

        <button
          type="submit"
          className="mt-5 p-2 bg-black w-32 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </FormComponent>
  );
};

export default PaymentModalElement;
