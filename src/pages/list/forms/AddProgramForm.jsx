import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const API_URL = "http://127.0.0.1:8000/api/programs";

// Define a Zod schema for the add program form
const schema = z.object({
  name: z.string().min(2, "Program name is required"),
  program_code: z.string().min(1, "Program code is required"),
  description: z.string().min(1, "Description is required"),
  university_id: z.preprocess(
    (val) => Number(val),
    z.number({ invalid_type_error: "University ID must be a number" }).min(1, "University ID is required")
  ),
});

const AddProgramForm = ({ open, handleClose, onProgramAdded }) => {
  // Only render the modal if open is true
  if (!open) return null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      if (response.data.success) {
        toast.success("Program added successfully!");
        onProgramAdded(response.data.data);
        reset();
        handleClose();
      } else {
        toast.error("Failed to add program.");
      }
    } catch (error) {
      console.error("Error adding program:", error);
      toast.error("Error adding program.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Program</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Program Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Program Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter program name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Program Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Program Code
            </label>
            <input
              type="text"
              {...register("program_code")}
              placeholder="Enter program code (e.g., MSE)"
              className="input input-bordered w-full"
            />
            {errors.program_code && (
              <p className="text-red-500 text-xs mt-1">
                {errors.program_code.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Enter program description"
              className="textarea textarea-bordered w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* University ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              University ID
            </label>
            <input
              type="number"
              {...register("university_id")}
              placeholder="Enter university ID"
              className="input input-bordered w-full"
            />
            {errors.university_id && (
              <p className="text-red-500 text-xs mt-1">
                {errors.university_id.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Add Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProgramForm;
