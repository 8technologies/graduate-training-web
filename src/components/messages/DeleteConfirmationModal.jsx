import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { motion } from "framer-motion";

const DeleteConfirmationModal = ({ open, handleClose, handleConfirm, student }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg font-semibold text-gray-800"
        >
          ⚠️ Confirm Deletion
        </motion.div>
      </DialogTitle>

      <DialogContent className="p-5 bg-gray-50 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-700 text-md"
        >
          Are you sure you want to delete <strong>{student?.first_name} {student?.last_name}</strong>?
          This action cannot be undone.
        </motion.p>
      </DialogContent>

      <DialogActions className="p-4 flex justify-between bg-gray-100 rounded-b-md">
        <button className="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg" onClick={handleClose}>
          ❌ Cancel
        </button>
        <button className="btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg" onClick={handleConfirm}>
          🗑 Delete
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
