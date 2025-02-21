"use client";
import { MdKeyboardArrowLeft } from "react-icons/md";
import useCreateNote from "@/mutations/CreateNoteMutation/CreateNoteMutation";
import { useGetWorkersByModel } from "@/queries/useGetLeadByIdQuery/useGetLeadById";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"; // Updated import
import React, { useState } from "react";

const LeadDetailPage = () => {
  const { id } = useParams();
  const route = useRouter();

  const { data, refetch } = useGetWorkersByModel(id as string);

  const { mutate: createNoteMutation } = useCreateNote();

  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      createNoteMutation({ leadId: id as string, noteContent: newNote });
      setNewNote("");
      refetch();
    }
  };

  return (
    <div className="text-white w-[98vw] xl:w-[80vw] min-h-fit flex py-4 h-[95vh] font-bebas relative flex-col">
      <div
        className="absolute left-1 top-0 cursor-pointer text-xl flex items-center"
        onClick={() => route.push("/Dashboard/Leads")}
      >
        <MdKeyboardArrowLeft />
        Go Back
      </div>
      <div className="w-full border-r-gray-300 mt-6 flex gap-5 relative justify-between px-4">
        {!data?.seen && (
          <div className="w-3 h-3 absolute rounded-full bg-red-600 top-2 right-14"></div>
        )}
        <div className="flex gap-3">
          <Image
            src={data?.img as string}
            className="w-36 h-36 rounded-full"
            alt="image"
            width={500}
            height={500}
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl flex gap-5">
              {data?.name}{" "}
              <div className="rounded-full bg-white text-black flex gap-2 text-lg items-center w-fit px-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    data?.active ? "bg-green-600" : "bg-gray-600"
                  }`}
                ></div>
                <p>{data?.active ? "Active" : "Inactive"}</p>
              </div>
            </h1>
            <div className="flex gap-3 items-center">
              {data?.modelId.map((item) => (
                <div
                  className="bg-white text-black px-3 py-1 rounded-xl"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            worker : {data?.workerId}{" "}
            <h1 className="flex gap-1 items-center text-xl text-white">
              Description :
              <p className="text-gray-300 text-sm">{data?.description}</p>
            </h1>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-4">
          <textarea
            className="bg-gray-800 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            rows={4}
          />
          <button
            onClick={handleAddNote}
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Add Note
          </button>
        </div>
      </div>

      <div className="mt-10 w-full flex flex-col gap-6">
        <div className="mt-6">
          {Array.isArray(data?.notes) && data?.notes.length === 0 ? (
            <p className="text-gray-400">No notes added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-6 justify-left">
              {Array.isArray(data?.notes) &&
                data?.notes.map((note, index) => {
                  const { date, content, active } = note as {
                    date: string;
                    content: string;
                    active: boolean;
                  };

                  const formattedDate = new Date(date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );

                  return (
                    <div
                      key={index}
                      className="bg-gray-800 text-white p-4 rounded-lg max-w-md w-full sm:w-[300px] md:w-[350px] lg:w-[400px] shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-400">
                          {formattedDate}
                        </span>
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            active ? "bg-green-500" : "bg-gray-600"
                          }`}
                        />
                      </div>
                      <p className="text-lg">{content}</p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;
