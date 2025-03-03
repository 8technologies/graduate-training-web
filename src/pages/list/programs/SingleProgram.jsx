import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const SingleProgramModal = ({ open, handleClose, programId }) => {
  if (!open) return null;

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && programId) {
      const fetchProgram = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/programs/${programId}`);
          if (response.data.success) {
            setProgram(response.data.data);
          } else {
            setError("Failed to fetch program details.");
            toast.error("Failed to fetch program details.");
          }
        } catch (err) {
          console.error("Error fetching program details:", err);
          setError("Error fetching program details.");
          toast.error("Error fetching program details.");
        } finally {
          setLoading(false);
        }
      };

      fetchProgram();
    }
  }, [open, programId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-xl p-8 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={24} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : program ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{program.name}</h2>
            <p className="text-gray-600">
              <span className="font-semibold">Program Code:</span> {program.program_code}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Description:</span> {program.description}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">University ID:</span> {program.university_id}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Created At:</span> {new Date(program.created_at).toLocaleString()}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Updated At:</span> {new Date(program.updated_at).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-700">No program details found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default SingleProgramModal;
