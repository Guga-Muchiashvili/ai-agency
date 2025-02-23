"use client";
import FormComponent from "@/common/context/FormProvider";
import DropdownFieldElement from "@/common/elements/dropDownElement/DropDownElement";
import { MultiSelect } from "@/common/elements/multiSelectElement";
import TextFieldElementComponent from "@/common/elements/textInputElement/TextInputElement";
import ToggleElementComponent from "@/common/elements/toggleElement/ToggleElement";
import { LeadSchema } from "@/common/schema";
import { IFormLead, Imodel, Iworker } from "@/common/types/types";
import useCreateLead from "@/mutations/CreateLeadMutation/createLeadMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

const LeadFilterElement = ({
  onModelChange,
  models,
  workers,
}: {
  onModelChange: (value: string) => void;
  models: Imodel[] | undefined;
  workers: Iworker[] | undefined;
}) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { mutate: addLead, isSuccess } = useCreateLead();

  const methods: UseFormReturn<IFormLead> = useForm({
    resolver: yupResolver(LeadSchema),
    defaultValues: {
      active: false,
      description: "",
      img: "",
      modelId: [],
      name: "",
      seen: false,
      workerId: "",
    },
  });

  const submit = async (data: IFormLead) => {
    try {
      addLead(data);
    } catch (err) {
      console.error("Error adding lead:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowModal(false);
      methods.reset();
    }
  }, [isSuccess, setShowModal, methods]);

  const modelOptions = models?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const workerOptions = workers?.map((item) => item.name);

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedModel(value);
    onModelChange(value);
  };

  const handleWorkerChange = (event: SelectChangeEvent<string>) => {
    setSelectedWorker(event.target.value);
  };

  const handleAddLead = () => {
    setShowModal(true);
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
      methods.reset();
    }
  };

  return (
    <div className="w-full h-fit flex md:flex-row flex-col items-center gap-4 justify-between px-4 rounded-2xl shadow-lg">
      <TextField
        id="outlined-basic"
        label="Search"
        variant="standard"
        InputLabelProps={{
          style: { color: "white" },
        }}
        InputProps={{
          style: {
            color: "white",
            borderBottom: "2px solid white",
          },
        }}
        className="border-b-2 border-white w-[250px] xl:w-[350px]"
      />

      <div className="flex gap-5 items-center">
        <FormControl sx={{ minWidth: 120, maxWidth: 180 }}>
          <InputLabel id="model-select-label" style={{ color: "white" }}>
            Model
          </InputLabel>
          <Select
            labelId="model-select-label"
            id="model-select"
            value={selectedModel}
            label="Model"
            onChange={handleModelChange}
            className="text-white"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              color: "white",
            }}
          >
            {models?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, maxWidth: 180 }}>
          <InputLabel id="worker-select-label" style={{ color: "white" }}>
            Worker
          </InputLabel>
          <Select
            labelId="worker-select-label"
            id="worker-select"
            value={selectedWorker}
            label="Worker"
            onChange={handleWorkerChange}
            className="text-white"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              color: "white",
            }}
          >
            {workers?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div
          className="h-12 text-2xl flex items-center justify-center cursor-pointer w-fit px-6 rounded-xl bg-white text-black"
          onClick={handleAddLead}
        >
          <h1>Add Lead</h1>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black z-30 bg-opacity-50 flex justify-center items-center"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg flex flex-col items-center w-[90vw] md:w-[65vw] lg:w-[40vw]"
          >
            <h2 className="text-2xl text-gray-800">Add New Lead</h2>
            <FormComponent
              methods={methods}
              submit={methods.handleSubmit(submit)}
            >
              <TextFieldElementComponent label="name" name="name" />
              <TextFieldElementComponent label="image" name="img" />
              <TextFieldElementComponent
                label="description"
                name="description"
              />
              <div className="w-full flex gap-5">
                <MultiSelect
                  label="Model"
                  name="modelId"
                  options={modelOptions}
                />
                <DropdownFieldElement
                  label="worker"
                  name="workerId"
                  options={workerOptions}
                />
              </div>

              <div className="w-full flex gap-5">
                <ToggleElementComponent label="isActive" name="active" />
                <ToggleElementComponent label="isSeen" name="seen" />
              </div>
              <button
                type="submit"
                className="mt-5 p-2 bg-black w-32 text-white rounded-md"
              >
                Submit
              </button>
            </FormComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadFilterElement;
