import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { DataGrid, DataGridColumnHeader, DataGridRowSelect, DataGridRowSelectAll } from "../../../components";
import { toast } from "sonner";
import { KeenIcon } from "@/components";
import AddSupervisorForm from "../forms/AddSupervisorForm";
import EditSupervisorForm from "../forms/EditSupervisorForm";
import { DeleteConfirmationModal } from "../../../components/messages";
import { useNavigate } from "react-router-dom";
import SupervisorProfileModal from "./SupervisorProfile";

const API_URL = "http://127.0.0.1:8000/api/supervisors";

const SupervisorPageList = () => {
  const navigate = useNavigate();
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // For AddSupervisorForm
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [supervisorToDelete, setSupervisorToDelete] = useState(null);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleViewSupervisor = (supervisorId) => {
    setSelectedSupervisorId(supervisorId);
    setIsProfileModalOpen(true);
  };

  const handleDeleteSupervisor = async (supervisor) => {
    if (window.confirm(`Are you sure you want to delete ${supervisor.first_name} ${supervisor.last_name}?`)) {
      try {
        const response = await axios.delete(`${API_URL}/${supervisor.id}`);
        if (response.data.success) {
          setSupervisors((prev) => prev.filter((s) => s.id !== supervisor.id));
          toast.success("Supervisor deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting supervisor:", error);
        toast.error("Failed to delete supervisor");
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!supervisorToDelete) return;
    try {
      const response = await axios.delete(`${API_URL}/${supervisorToDelete.id}`);
      if (response.data.success) {
        setSupervisors((prev) => prev.filter((s) => s.id !== supervisorToDelete.id));
        toast.success(`✅ ${supervisorToDelete.first_name} deleted successfully!`);
      }
    } catch (error) {
      console.error("Error deleting supervisor:", error);
      toast.error("❌ Failed to delete supervisor!");
    }
    setDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = (supervisor) => {
    setSupervisorToDelete(supervisor);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
          setSupervisors(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch supervisors:", error);
        toast.error("Failed to fetch supervisors");
      } finally {
        setLoading(false);
      }
    };
    fetchSupervisors();
  }, []);

  // Update the list when a new supervisor is added
  const handleSupervisorAdded = async (newSupervisor) => {
    try {
      const response = await axios.get(`${API_URL}/${newSupervisor.id}`);
      if (response.data.success) {
        const updatedSupervisor = response.data.data;
        setSupervisors((prev) => [updatedSupervisor, ...prev]);
      } else {
        toast.error("Failed to fetch new supervisor details!");
      }
    } catch (error) {
      console.error("Error fetching updated supervisor:", error);
      toast.error("Could not refresh supervisor list.");
    }
    setIsModalOpen(false);
  };

  const filteredSupervisors = useMemo(() => {
    if (!searchTerm) return supervisors;
    return supervisors.filter((s) =>
      s.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.university_name && s.university_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, supervisors]);

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: () => <DataGridRowSelectAll />,
      cell: ({ row }) => <DataGridRowSelect row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "first_name",
      header: ({ column }) => <DataGridColumnHeader title="First Name" column={column} />,
      cell: ({ row }) => <span className="text-gray-700 font-normal">{row.original.first_name}</span>,
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => <DataGridColumnHeader title="Last Name" column={column} />,
      cell: ({ row }) => <span className="text-gray-700 font-normal">{row.original.last_name}</span>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataGridColumnHeader title="Email" column={column} />,
      cell: ({ row }) => <span className="text-gray-700 font-normal">{row.original.email}</span>,
    },
    {
      accessorKey: "telephone",
      header: ({ column }) => <DataGridColumnHeader title="Phone Number" column={column} />,
      cell: ({ row }) => <span className="text-gray-700 font-normal">{row.original.telephone}</span>,
    },
    {
      accessorKey: "course_name",
      header: ({ column }) => <DataGridColumnHeader title="Program" column={column} />,
      cell: ({ row }) => <span className="text-gray-700 font-normal">{row.original.course_name || "N/A"}</span>,
    },
    {
      accessorKey: "university_name",
      header: ({ column }) => <DataGridColumnHeader title="University" column={column} />,
      cell: ({ row }) => <span className="text-gray-700 font-normal">{row.original.university_name || "N/A"}</span>,
    },
    {
      id: "actions",
      header: () => "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <div className="relative group">
            <button className="btn btn-xs btn-warning" onClick={() => handleViewSupervisor(row.original.id)}>
              <img height={20} width={20} src="/metronic/tailwind/react/media/images/view1.png" alt="View" />
            </button>
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded-md px-2 py-1">
              View
            </span>
          </div>
          <div className="relative group">
            <button
              className="btn btn-xs btn-primary"
              onClick={() => {
                setSelectedSupervisor(row.original);
                setIsEditModalOpen(true);
              }}
            >
              <img height={20} width={20} src="/metronic/tailwind/react/media/images/edit.png" alt="Edit" />
            </button>
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded-md px-2 py-1">
              Edit
            </span>
          </div>
          <div className="relative group">
            <button className="btn btn-xs btn-danger" onClick={() => handleOpenDeleteModal(row.original)}>
              <img height={20} width={20} src="/metronic/tailwind/react/media/images/delete.png" alt="Delete" />
            </button>
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-red-700 text-white text-xs rounded-md px-2 py-1">
              Delete
            </span>
          </div>
        </div>
      ),
    },
  ], []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const Toolbar = () => {
    return (
      <div className="card-header px-5 py-5 border-b-0 flex-wrap gap-2">
        <h3 className="card-title">All Supervisors</h3>
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="btn btn-primary" onClick={openModal}>
            + Add Supervisor
          </button>
          <div className="relative">
            <KeenIcon
              icon="magnifier"
              className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3"
            />
            <input
              type="text"
              placeholder="Search Supervisors"
              className="input input-sm ps-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading supervisors...</p>
      ) : (
        <DataGrid
          columns={columns}
          data={filteredSupervisors}
          rowSelection={true}
          pagination={{ size: 10 }}
          sorting={[{ id: "first_name", desc: false }]}
          toolbar={<Toolbar />}
          layout={{ card: true }}
        />
      )}

      <SupervisorProfileModal
        open={isProfileModalOpen}
        handleClose={() => setIsProfileModalOpen(false)}
        supervisorId={selectedSupervisorId}
      />

      <AddSupervisorForm open={isModalOpen} handleClose={closeModal} onSupervisorAdded={handleSupervisorAdded} />

      {isEditModalOpen && selectedSupervisor && (
        <EditSupervisorForm
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          supervisor={selectedSupervisor}
          onSupervisorUpdated={(updatedSupervisor) => {
            setSupervisors((prev) =>
              prev.map((s) => (s.id === updatedSupervisor.id ? updatedSupervisor : s))
            );
            setIsEditModalOpen(false);
          }}
        />
      )}

      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleConfirm={handleDeleteConfirm}
        student={supervisorToDelete}
      />
    </div>
  );
};

export default SupervisorPageList;
