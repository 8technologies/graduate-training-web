import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Slide } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ProgressIndicatorChart } from "../../../components/charts";

const API_URL = "http://127.0.0.1:8000/api/supervisors";
//const API_URL = "https://gtts-api.comfarnet.org/api/supervisors";

const SupervisorProfileModal = ({ open, handleClose, supervisorId }) => {
  const [supervisor, setSupervisor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supervisorId || !open) return;

    setLoading(true);
    axios
      .get(`${API_URL}/${supervisorId}`)
      .then((response) => {
        if (response.data.success) {
          setSupervisor(response.data.data);
        } else {
          toast.error("Failed to load supervisor details.");
        }
      })
      .catch(() => toast.error("Error fetching supervisor data."))
      .finally(() => setLoading(false));
  }, [supervisorId, open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      TransitionComponent={Slide}
      keepMounted
    >
      <DialogTitle className="text-center font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 rounded-t-lg shadow-lg">
        📘 Supervisor Profile
      </DialogTitle>

      <DialogContent className="p-8 bg-gradient-to-b from-blue-50 to-white rounded-md shadow-md">
        {loading && open ? (
          <p className="text-center text-gray-500 animate-pulse">Loading supervisor data...</p>
        ) : !supervisor ? (
          <p className="text-center text-red-500">Supervisor not found.</p>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <img
                src="/metronic/tailwind/react/media/images/supervisor-placeholder.jpg"
                alt="Profile"
                className="w-32 h-32 rounded-full shadow-lg border-4 border-white transition-transform duration-300 hover:scale-105"
              />
              <h2 className="text-2xl font-semibold mt-4 text-gray-800">
                {supervisor.first_name} {supervisor.last_name}
              </h2>
              <p className="text-gray-500">{supervisor.email}</p>
              <p className="text-gray-500">{supervisor.telephone}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 grid grid-cols-2 gap-6"
            >
              <div className="p-6 bg-white shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105">
                <h4 className="text-sm font-medium text-gray-600">🏫 University</h4>
                <p className="text-lg font-semibold text-gray-800">{supervisor.university_name || "N/A"}</p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105">
                <h4 className="text-sm font-medium text-gray-600">📊 Attendance</h4>
                <p className="text-lg font-semibold text-green-600">90%</p>
              </div>
            </motion.div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-lg font-semibold">📈 Supervisor Performance Chart</h1>
              <ProgressIndicatorChart />
            </div>
          </>
        )}
      </DialogContent>

      <DialogActions className="p-4 flex justify-center bg-gray-100 rounded-b-lg">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          onClick={handleClose}
        >
          ❌ Close
        </motion.button>
      </DialogActions>
    </Dialog>
  );
};

export default SupervisorProfileModal;
