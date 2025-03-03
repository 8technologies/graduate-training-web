import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { DataGrid, DataGridColumnHeader, DataGridRowSelect, DataGridRowSelectAll } from "../../../components";
import { toast } from "sonner";
import { KeenIcon } from "@/components";
import AddStudentsForm from "../forms/AddStudentsForm"; // For adding students
import EditStudentForm from "../forms/EditStudentForm"; // For editing students
import { DeleteConfirmationModal } from "../../../components/messages";
import { useNavigate } from "react-router-dom";
import StudentProfileModal from "./StudentProfile";
import { CircularProgress } from "@mui/material"; // Progress indicator

const API_URL = "http://127.0.0.1:8000/api/students";

const StudentPageList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); // For AddStudentsForm
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleViewStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setIsProfileModalOpen(true);
  };

  const handleDeleteStudent = async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.first_name} ${student.last_name}?`)) {
      try {
        const response = await axios.delete(`${API_URL}/${student.id}`);
        if (response.data.success) {
          setStudents((prev) => prev.filter((s) => s.id !== student.id));
          toast.success("Student deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student");
      }
    }
  };

  // Handle Delete Confirmation
  const handleStudentDelete = async () => {
    if (!studentToDelete) return;
    try {
      const response = await axios.delete(`${API_URL}/${studentToDelete.id}`);
      if (response.data.success) {
        setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
        toast.success(`✅ ${studentToDelete.first_name} deleted successfully!`);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("❌ Failed to delete student!");
    }
    setDeleteModalOpen(false);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  // Fetch Students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
          setStudents(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Update student list when a new student is added
  const handleStudentAdded = async (newStudent) => {
    try {
      const response = await axios.get(`${API_URL}/${newStudent.id}`);
      if (response.data.success) {
        const updatedStudent = response.data.data;
        setStudents((prevStudents) => [updatedStudent, ...prevStudents]);
      } else {
        toast.error("Failed to fetch new student details!");
      }
    } catch (error) {
      console.error("Error fetching updated student:", error);
      toast.error("Could not refresh student list.");
    }
    setIsModalOpen(false);
  };

  // Search Filter
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    return students.filter((student) =>
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.university_name && student.university_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, students]);

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
      accessorKey: "student_level_name",
      header: ({ column }) => <DataGridColumnHeader title="Student Level" column={column} />,
      cell: ({ row }) => <span className="text-gray-700 font-normal">{row.original.student_level_name || "N/A"}</span>,
    },
    {
      accessorKey: "telephone",
      header: ({ column }) => <DataGridColumnHeader title="Phone Number" column={column} />,
      cell: ({ row }) => <span className="text-gray-700 font-normal">{row.original.telephone}</span>,
    },
    {
      accessorKey: "university_name",
      header: "University", 
      cell: ({ row }) => <span className="text-gray-700 font-normal">{row.original.university_name || "N/A"}</span>,
    },
    {
      id: "actions",
      header: () => "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2">
          {/* View Button */}
          <div className="relative group">
            <button className="btn btn-xs btn-warning" onClick={() => handleViewStudent(row.original.id)}>
              <img height={20} width={20} src="/metronic/tailwind/react/media/images/view1.png" alt="View" />
            </button>
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded-md px-2 py-1">
              View
            </span>
          </div>
          {/* Edit Button */}
          <div className="relative group">
            <button className="btn btn-xs btn-primary" onClick={() => {
                setSelectedStudent(row.original);
                setIsEditModalOpen(true);
              }}>
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

  const Toolbar = () => (
    <div className="card-header px-5 py-5 border-b-0 flex-wrap gap-2">
      <h3 className="card-title">All Students</h3>
      <div className="flex flex-wrap items-center gap-2.5">
        <button className="btn btn-primary" onClick={openModal}>
          + Add Student
        </button>
        <div className="relative">
          <KeenIcon
            icon="magnifier"
            className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3"
          />
          <input
            type="text"
            placeholder="Search Students"
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
          data={filteredStudents}
          rowSelection={true}
          pagination={{ size: 10 }}
          sorting={[{ id: "first_name", desc: false }]}
          toolbar={<Toolbar />}
          layout={{ card: true }}
        />
      )}

      <StudentProfileModal
        open={isProfileModalOpen}
        handleClose={() => setIsProfileModalOpen(false)}
        studentId={selectedStudentId}
      />

      {/* Add Student Modal */}
      <AddStudentsForm open={isModalOpen} handleClose={closeModal} onStudentAdded={handleStudentAdded} />

      {/* Edit Student Modal */}
      {isEditModalOpen && selectedStudent && (
        <EditStudentForm
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          student={selectedStudent}
          onStudentUpdated={(updatedStudent) => {
            setStudents((prev) =>
              prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
            );
            setIsEditModalOpen(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleConfirm={handleStudentDelete} // Your delete function for students
        item={studentToDelete}
        entityLabel="Student"
      />
    </div>
  );
};

export default StudentPageList;
