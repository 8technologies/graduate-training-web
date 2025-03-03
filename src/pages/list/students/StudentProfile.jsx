import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ProgressIndicatorChart } from "../../../components/charts";
import { AiOutlineClose } from "react-icons/ai";

const API_URL = "http://127.0.0.1:8000/api/students";

const StudentProfileModal = ({ open, handleClose, studentId }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId || !open) return;

    setLoading(true);
    axios
      .get(`${API_URL}/${studentId}`)
      .then((response) => {
        if (response.data.success) {
          setStudent(response.data.data);
        } else {
          toast.error("Failed to load student details.");
        }
      })
      .catch(() => toast.error("Error fetching student data."))
      .finally(() => setLoading(false));
  }, [studentId, open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      TransitionComponent={Slide}
      keepMounted
    >
      {/* Modal Header */}
      <DialogTitle className="text-center font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 rounded-t-lg shadow-lg">
        📘 Student Profile
      </DialogTitle>

      <DialogContent className="p-8 bg-gradient-to-b from-blue-50 to-white rounded-md shadow-md">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <CircularProgress size={48} color="primary" />
          </div>
        ) : !student ? (
          <p className="text-center text-red-500">Student not found.</p>
        ) : (
          <>
            {/* Student Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src="/metronic/tailwind/react/media/images/omo4.jpg"
                alt="Profile"
                className="w-32 h-32 rounded-full shadow-lg border-4 border-white transition-transform duration-300 hover:scale-105"
              />
              <h2 className="text-2xl font-semibold mt-4 text-gray-800">
                {student.first_name} {student.last_name}
              </h2>
              <p className="text-gray-500">{student.email}</p>
              <p className="text-gray-500">{student.telephone}</p>
              <p className="text-lg font-semibold text-blue-700 mt-2">
                {student.student_level_name && student.student_level_name.trim() !== ""
                  ? `${student.student_level_name} Student`
                  : "No Student Level Assigned"}
              </p>
            </motion.div>

            {/* Student Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 grid grid-cols-3 gap-6"
            >
              <div className="p-6 bg-white shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105">
                <h4 className="text-sm font-medium text-gray-600">📚 Program</h4>
                <p className="text-lg font-semibold text-gray-800">{student.course_name || "N/A"}</p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105">
                <h4 className="text-sm font-medium text-gray-600">🏫 University</h4>
                <p className="text-lg font-semibold text-gray-800">{student.university_name || "N/A"}</p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105">
                <h4 className="text-sm font-medium text-gray-600">📊 Performance</h4>
                <p className="text-lg font-semibold text-green-600">90%</p>
              </div>
            </motion.div>

            {/* Small Stats Cards */}
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg flex gap-4 items-center shadow-lg"
              >
                <img src="/metronic/tailwind/react/media/images/course1.png" alt="Course" width={40} height={40} />
                <div>
                  <h1 className="text-xl font-semibold">5</h1>
                  <span className="text-sm text-gray-500">Current Course Units</span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg flex gap-4 items-center shadow-lg"
              >
                <img src="/metronic/tailwind/react/media/images/superviso1.png" alt="Supervisor" width={40} height={40} />
                <div>
                  <h1 className="text-xl font-semibold">2</h1>
                  <span className="text-sm text-gray-500">My Supervisor</span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg flex gap-4 items-center shadow-lg"
              >
                <img src="/metronic/tailwind/react/media/images/levels1.png" alt="Performance" width={40} height={40} />
                <div>
                  <h1 className="text-xl font-semibold">3</h1>
                  <span className="text-sm text-gray-500">Training Schedules</span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg flex gap-4 items-center shadow-lg"
              >
                <img src="/metronic/tailwind/react/media/images/singleAttendance.png" alt="Attendance" width={40} height={40} />
                <div>
                  <h1 className="text-xl font-semibold">90%</h1>
                  <span className="text-sm text-gray-500">Attendance</span>
                </div>
              </motion.div>
            </div>

            {/* Progress Chart */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-lg font-semibold">📈 Student Progress WorkRate</h1>
              <ProgressIndicatorChart />
            </div>
          </>
        )}
      </DialogContent>

      {/* Close Button */}
      <DialogActions className="p-4 flex justify-center bg-gray-100 rounded-b-lg">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          onClick={handleClose}
        >
          <span>Close</span>
          <AiOutlineClose size={24} />
        </motion.button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentProfileModal;
