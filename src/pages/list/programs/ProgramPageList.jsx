import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  DataGrid,
  DataGridColumnHeader,
  DataGridRowSelect,
  DataGridRowSelectAll,
} from "../../../components";
import { toast } from "sonner";
import { KeenIcon } from "@/components";
import AddProgramForm from "../forms/AddProgramForm";
import SingleProgram from "./SingleProgram"; // For viewing a program
import EditProgramForm from "../forms/EditProgramForm"; // For editing a program
import { DeleteConfirmationModal } from "../../../components/messages";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const API_URL = "http://127.0.0.1:8000/api/programs";

const ProgramPageList = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false); // For AddProgramForm
  const [isSingleProgramOpen, setIsSingleProgramOpen] = useState(false); // For viewing a program
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For editing a program
  const [selectedProgram, setSelectedProgram] = useState(null); // For editing
  const [selectedProgramId, setSelectedProgramId] = useState(null); // For viewing
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);

  // Handle "View Program" button
  const handleViewProgram = (programId) => {
    setSelectedProgramId(programId);
    setIsSingleProgramOpen(true);
  };

  // Handle "Edit Program" button
  const handleEditProgram = (program) => {
    setSelectedProgram(program);
    setIsEditModalOpen(true);
  };

  // Handle Delete Confirmation
  const handleOpenDeleteModal = (program) => {
    setProgramToDelete(program);
    setDeleteModalOpen(true);
  };

  const handleProgramDelete = async () => {
    if (!programToDelete) return;
    try {
      const response = await axios.delete(`${API_URL}/${programToDelete.id}`);
      if (response.data.success) {
        setPrograms((prev) =>
          prev.filter((p) => p.id !== programToDelete.id)
        );
        toast.success(`✅ ${programToDelete.name} deleted successfully!`);
      }
    } catch (error) {
      console.error("Error deleting program:", error);
      toast.error("❌ Failed to delete program!");
    }
    setDeleteModalOpen(false);
  };

  // Fetch Programs on mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
          setPrograms(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
        toast.error("Failed to fetch programs");
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // Add Program callback
  const handleProgramAdded = (newProgram) => {
    setPrograms((prev) => [newProgram, ...prev]);
    setIsModalOpen(false);
  };

  // Update Program callback for editing
  const handleProgramUpdated = (updatedProgram) => {
    console.log("Updated program:", updatedProgram);
    setPrograms((prev) =>
      prev.map((p) => (p.id === updatedProgram.id ? { ...updatedProgram } : p))
    );
    setIsEditModalOpen(false);
  };

  // Filter programs by search term
  const filteredPrograms = useMemo(() => {
    if (!searchTerm) return programs;
    return programs.filter((program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.program_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, programs]);

  // Table Columns
  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: () => <DataGridRowSelectAll />,
      cell: ({ row }) => <DataGridRowSelect row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataGridColumnHeader title="Program Name" column={column} />
      ),
      cell: ({ row }) => (
        <span className="text-gray-700 font-normal">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "program_code",
      header: ({ column }) => (
        <DataGridColumnHeader title="Program Code" column={column} />
      ),
      cell: ({ row }) => (
        <span className="text-gray-700 font-normal">{row.original.program_code}</span>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataGridColumnHeader title="Description" column={column} />
      ),
      cell: ({ row }) => (
        <span className="text-gray-700 font-normal">{row.original.description}</span>
      ),
    },
    {
      accessorKey: "university_id",
      header: ({ column }) => (
        <DataGridColumnHeader title="University ID" column={column} />
      ),
      cell: ({ row }) => (
        <span className="text-gray-700 font-normal">{row.original.university_id}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2">
          {/* View Button */}
          <div className="relative group">
            <button
              className="btn btn-xs btn-warning"
              onClick={() => handleViewProgram(row.original.id)}
            >
              <img
                height={20}
                width={20}
                src="/metronic/tailwind/react/media/images/view1.png"
                alt="View"
              />
            </button>
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded-md px-2 py-1">
              View
            </span>
          </div>
          {/* Edit Button */}
          <div className="relative group">
            <button
              className="btn btn-xs btn-primary"
              onClick={() => handleEditProgram(row.original)}
            >
              <img
                height={20}
                width={20}
                src="/metronic/tailwind/react/media/images/edit.png"
                alt="Edit"
              />
            </button>
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded-md px-2 py-1">
              Edit
            </span>
          </div>
          {/* Delete Button */}
          <div className="relative group">
            <button
              className="btn btn-xs btn-danger"
              onClick={() => handleOpenDeleteModal(row.original)}
            >
              <img
                height={20}
                width={20}
                src="/metronic/tailwind/react/media/images/delete.png"
                alt="Delete"
              />
            </button>
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-red-700 text-white text-xs rounded-md px-2 py-1">
              Delete
            </span>
          </div>
        </div>
      ),
    },
  ], []);

  const Toolbar = () => (
    <div className="card-header px-5 py-5 border-b-0 flex-wrap gap-2">
      <h3 className="card-title">All Programs</h3>
      <div className="flex flex-wrap items-center gap-2.5">
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Program
        </button>
        <div className="relative">
          <KeenIcon
            icon="magnifier"
            className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3"
          />
          <input
            type="text"
            placeholder="Search Programs"
            className="input input-sm ps-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="card p-6">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <CircularProgress size={48} color="primary" />
        </div>
      ) : (
        <DataGrid
          columns={columns}
          data={filteredPrograms}
          rowSelection={true}
          pagination={{ size: 10 }}
          sorting={[{ id: "name", desc: false }]}
          toolbar={<Toolbar />}
          layout={{ card: true }}
        />
      )}

      {/* View Program Modal */}
      {isSingleProgramOpen && (
        <SingleProgram
          open={isSingleProgramOpen}
          handleClose={() => setIsSingleProgramOpen(false)}
          programId={selectedProgramId}
        />
      )}

      {/* Add Program Modal */}
      {isModalOpen && (
        <AddProgramForm
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onProgramAdded={handleProgramAdded}
        />
      )}

      {/* Edit Program Modal */}
      {isEditModalOpen && selectedProgram && (
        <EditProgramForm
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          program={selectedProgram}
          onProgramUpdated={handleProgramUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleConfirm={handleProgramDelete}
        item={programToDelete}
        entityLabel="Program"
      />
    </div>
  );
};

export default ProgramPageList;
