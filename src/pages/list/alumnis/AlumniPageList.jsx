import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { DataGrid, DataGridColumnHeader, DataGridRowSelect, DataGridRowSelectAll } from "../../../components";
import { toast } from "sonner";
import { KeenIcon } from "@/components";
import AddAlumniForm from "../forms/AddAlumniForm"; 
import EditAlumniForm from "../forms/EditAlumniForm"; 
import { DeleteConfirmationModal } from "../../../components/messages";
import { useNavigate } from "react-router-dom";
import AlumniProfileModal from "./AlumniProfile";

const API_URL = "http://127.0.0.1:8000/api/alumnis";

const AlumniPageList = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [alumniToDelete, setAlumniToDelete] = useState(null);
  const [selectedAlumniId, setSelectedAlumniId] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleViewAlumni = (alumniId) => {
    setSelectedAlumniId(alumniId);
    setIsProfileModalOpen(true);
  };

  const handleDeleteAlumni = async (alum) => {
    if (window.confirm(`Are you sure you want to delete ${alum.first_name} ${alum.last_name}?`)) {
      try {
        const response = await axios.delete(`${API_URL}/${alum.id}`);
        if (response.data.success) {
          setAlumni((prev) => prev.filter((a) => a.id !== alum.id));
          toast.success("Alumni deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting alumni:", error);
        toast.error("Failed to delete alumni");
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!alumniToDelete) return;
    try {
      const response = await axios.delete(`${API_URL}/${alumniToDelete.id}`);
      if (response.data.success) {
        setAlumni((prev) => prev.filter((a) => a.id !== alumniToDelete.id));
        toast.success(`✅ ${alumniToDelete.first_name} deleted successfully!`);
      }
    } catch (error) {
      console.error("Error deleting alumni:", error);
      toast.error("❌ Failed to delete alumni!");
    }
    setDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = (alum) => {
    setAlumniToDelete(alum);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
          setAlumni(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch alumni:", error);
        toast.error("Failed to fetch alumni");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAlumni();
  }, []);

  const handleAlumniAdded = async (newAlumni) => {
    try {
      const response = await axios.get(`${API_URL}/${newAlumni.id}`);
  
      if (response.data.success) {
        const updatedAlumni = response.data.data;
        setAlumni((prevAlumni) => [updatedAlumni, ...prevAlumni]);
      } else {
        toast.error("Failed to fetch new alumni details!");
      }
    } catch (error) {
      console.error("Error fetching updated alumni:", error);
      toast.error("Could not refresh alumni list.");
    }
  
    setIsModalOpen(false);
  };

  const filteredAlumni = useMemo(() => {
    if (!searchTerm) return alumni;
    return alumni.filter((alum) =>
      alum.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, alumni]);

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
      id: "actions",
      header: () => "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2">
          {/* View Button */}
          <div className="relative group">
            <button className="btn btn-xs btn-warning" onClick={() => handleViewAlumni(row.original.id)}>
              <img height={20} width={20} src="/metronic/tailwind/react/media/images/view1.png" alt="View" />
            </button>
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded-md px-2 py-1">
              View
            </span>
          </div>
          {/* Edit Button */}
          <div className="relative group">
            <button className="btn btn-xs btn-primary" onClick={() => { setSelectedAlumni(row.original); setIsEditModalOpen(true); }}>
              <img height={20} width={20} src="/metronic/tailwind/react/media/images/edit.png" alt="Edit" />
            </button>
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded-md px-2 py-1">
              Edit
            </span>
          </div>
          {/* Delete Button */}
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

  return (
    <div className="card p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading alumni...</p>
      ) : (
        <DataGrid
          columns={columns}
          data={filteredAlumni}
          rowSelection={true}
          pagination={{ size: 10 }}
          sorting={[{ id: "first_name", desc: false }]}
          toolbar={
            <div className="card-header px-5 py-5 border-b-0 flex-wrap gap-2">
              <h3 className="card-title">All Alumni</h3>
              <button className="btn btn-primary" onClick={openModal}>+ Add Alumni</button>
              <input type="text" placeholder="Search Alumni" className="input input-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          }
          layout={{ card: true }}
        />
      )}

      <AlumniProfileModal
        open={isProfileModalOpen}
        handleClose={() => setIsProfileModalOpen(false)}
        alumniId={selectedAlumniId}
      />

      <AddAlumniForm open={isModalOpen} handleClose={closeModal} onAlumniAdded={handleAlumniAdded} />

      {isEditModalOpen && selectedAlumni && (
        <EditAlumniForm
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          alumni={selectedAlumni}
          onAlumniUpdated={(updatedAlumni) => {
            setAlumni((prev) =>
              prev.map((a) => (a.id === updatedAlumni.id ? updatedAlumni : a))
            );
            setIsEditModalOpen(false);
          }}
        />
      )}

      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleConfirm={handleDeleteConfirm}
        alumni={alumniToDelete}
      />
    </div>
  );
};

export default AlumniPageList;
