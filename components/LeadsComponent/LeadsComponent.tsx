"use client";

import LeadFilterElement from "@/app/Dashboard/Components/LeadFilterElement/LeadFilterElement";
import { useGetModels } from "@/queries/useGetModelsQuery/useGetModelsQuery";
import { useGetWorkers } from "@/queries/useGetWorkersQuery/useGetWorkersQuert";
import React, { useState } from "react";
import { useGetLeads } from "@/queries/useGetLeadsQuery/useGetLeadsQuery";
import useDeleteLead from "@/mutations/DeleteLeadMutation/DeleteLeadMutation";
import CheckModal from "@/common/elements/checkModal/CheckModal";
import LeadCardComponent from "@/app/Dashboard/Components/LeadCardComponent/LeadCardComponent";

const LeadsComponent = () => {
  const onChange = () => {};

  const models = useGetModels();
  const workers = useGetWorkers();
  const { data: leads, refetch } = useGetLeads();
  const { mutate: deleteLeadMutation } = useDeleteLead();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const handleDelete = (leadId: string) => {
    setSelectedLeadId(leadId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedLeadId) {
      deleteLeadMutation(selectedLeadId);
      setIsModalOpen(false);
      refetch();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="text-white w-[98vw] xl:w-[80vw] min-h-fit flex flex-col gap-3 py-4 font-bebas">
      <LeadFilterElement
        onModelChange={onChange}
        models={models.data}
        workers={workers.data}
      />
      <div className="flex flex-wrap p-3 py-12 gap-7 justify-center">
        {leads?.map((item) => (
          <LeadCardComponent
            item={item}
            handleDelete={handleDelete}
            key={item.id}
          />
        ))}
      </div>

      <CheckModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this lead?"
      />
    </div>
  );
};

export default LeadsComponent;
