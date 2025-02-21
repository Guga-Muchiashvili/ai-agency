"use client";
import { Imodel, Iworker } from "@/common/types/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

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

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedModel(value);
    onModelChange(value);
  };

  const handleWorkerChange = (event: SelectChangeEvent<string>) => {
    setSelectedWorker(event.target.value);
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

      <div className="flex gap-5">
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
      </div>
    </div>
  );
};

export default LeadFilterElement;
