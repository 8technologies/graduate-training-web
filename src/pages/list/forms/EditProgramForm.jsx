import React, { useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Slide } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Program name is required"),
  program_code: z.string().min(1, "Program code is required"),
  description: z.string().min(1, "Description is required"),
  university_id: z.number({ invalid_type_error: "University ID must be a number" }),
});

const API_URL = "http://127.0.0.1:8000/api/programs";

const EditProgramForm = ({ open, handleClose, program, onProgramUpdated }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: program,
  });

  // Prefill form fields when the program changes
  useEffect(() => {
    reset(program);
  }, [program, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`${API_URL}/${program.id}`, data);
      if (response.data.success) {
        toast.success("Program updated successfully!");
        // Create a new object reference to force re-render in parent
        onProgramUpdated({ ...response.data.data });
        handleClose();
      } else {
        toast.error("Failed to update program!");
      }
    } catch (error) {
      console.error("Error updating program:", error.response ? error.response.data : error);
      toast.error("Error updating program");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Slide}
      keepMounted
    >
      <DialogTitle>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg font-semibold text-gray-800"
        >
          ✏️ Edit Program Information
        </motion.div>
      </DialogTitle>

      <DialogContent className="p-6 bg-gray-50 rounded-md">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Program Name</label>
            <input 
              {...register("name")} 
              className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Program Code</label>
            <input 
              {...register("program_code")} 
              className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" 
            />
            {errors.program_code && <p className="text-red-500 text-xs mt-1">{errors.program_code.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              {...register("description")} 
              className="textarea w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">University ID</label>
            <input 
              type="number" 
              {...register("university_id")} 
              className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" 
            />
            {errors.university_id && <p className="text-red-500 text-xs mt-1">{errors.university_id.message}</p>}
          </div>
        </motion.form>
      </DialogContent>

      <DialogActions className="p-4 flex justify-between bg-gray-100 rounded-b-md">
        <button 
          className="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg" 
          onClick={handleClose}
        >
          ❌ Cancel
        </button>
        <button 
          className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" 
          onClick={handleSubmit(onSubmit)}
        >
          💾 Update Program
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProgramForm;
