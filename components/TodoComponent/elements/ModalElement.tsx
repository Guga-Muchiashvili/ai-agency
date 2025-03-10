import MultiSelectFieldElement from "@/app/Dashboard/Components/LeadFilterElement/MultiSelectElement/MultiSelectElement";
import FormComponent from "@/common/context/FormProvider";
import DropdownFieldElement from "@/common/elements/dropDownElement/DropDownElement";
import TextFieldElementComponent from "@/common/elements/textInputElement/TextInputElement";
import { todoSchema } from "@/common/schema";
import { IFormTodo } from "@/common/types/types";
import { useGetWorkers } from "@/queries/useGetWorkersQuery/useGetWorkersQuert";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";

const TodoModal = ({ onClose }: { onClose: () => void }) => {
  const { data: workers } = useGetWorkers();
  const methods: UseFormReturn<IFormTodo> = useForm({
    resolver: yupResolver(todoSchema),
    defaultValues: {
      createdAt: "",
      deadline: "",
      description: "",
      label: "",
      title: "",
      type: "Todo",
      workerId: [""],
    },
  });

  const transferedWorkers = workers?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const submit = (data: IFormTodo) => {
    console.log(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-5/6 lg:w-1/3 text-black">
        <FormComponent methods={methods} submit={methods.handleSubmit(submit)}>
          <h1>Create Todo</h1>
          <div className="w-full flex items-center gap-4">
            <TextFieldElementComponent label="title" name="title" />
            <DropdownFieldElement
              label="label"
              name="label"
              options={["Important", "Must do", "GoodToDo"]}
            />
          </div>
          <TextFieldElementComponent label="description" name="description" />
          <div className="w-full flex items-center gap-4">
            <TextFieldElementComponent label="deadline" name="deadline" />
            <MultiSelectFieldElement
              label="workers"
              name="workerId"
              options={transferedWorkers}
            />
          </div>
          <div className="w-full flex items-center gap-5">
            <button
              type="submit"
              className="mt-5 p-2 bg-black w-32 text-white rounded-md"
            >
              Submit
            </button>
            <button
              type="submit"
              className="mt-5 p-2 bg-white w-32 text-black border-[1px] border-black rounded-md"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </FormComponent>
      </div>
    </div>
  );
};

export default TodoModal;
