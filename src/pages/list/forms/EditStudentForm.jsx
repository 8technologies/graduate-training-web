import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Slide } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion"; 

// ✅ Schema Validation
const schema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  telephone: z
  .string()
  .length(10, "Phone number must be exactly 10 digits") // ✅ Must be exactly 10 digits
  .regex(/^\d+$/, "Phone number must contain only numbers"),
  course_id: z.string().nonempty("Select a Program"),
});

const API_URL = "http://127.0.0.1:8000/api/students";

const EditStudentForm = ({ open, handleClose, student, onStudentUpdated }) => {
  const [courses, setCourses] = useState([]);
  const [initialValues, setInitialValues] = useState(null);

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ Prefill form fields when student changes
  useEffect(() => {
    if (student) {
      const formValues = {
        first_name: student.first_name || "",
        last_name: student.last_name || "",
        email: student.email || "",
        telephone: student.telephone || "",
        course_id: student.course_id ? String(student.course_id) : "", // ✅ Ensure it's a string
      };

      reset(formValues);
      setInitialValues(formValues);
      setValue("course_id", formValues.course_id);
    }
  }, [student, reset, setValue]);

  // ✅ Fetch Courses
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/courses")
      .then((response) => setCourses(response.data.data || []))
      .catch(() => toast.error("Failed to fetch courses"));
  }, []);

  // ✅ Check if any changes were made
  const isFormChanged = (newData) => {
    return JSON.stringify(newData) !== JSON.stringify(initialValues);
  };

  // ✅ Form Submission
  const onSubmit = async (data) => {
    if (!isFormChanged(data)) {
      toast.info("Nothing updated");
      handleClose();
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/${student.id}`, data);
      toast.success("Student updated successfully!");
      onStudentUpdated(response.data.data);
      reset();
      handleClose();
    } catch (error) {
      console.error("Error updating student:", error.response ? error.response.data : error);
      toast.error(`Ooops!!! ${error.response?.data?.error || "Unknown error"}`);
    }
  };

  // ✅ Render Dropdown Options
  const renderOptions = (items, fieldName, defaultText) => {
    const currentValue = watch(fieldName) || student?.[fieldName] || "";
    return (
      <>
        <option value="">{defaultText}</option>
        {items.map((item) => (
          <option key={item.id} value={String(item.id)} selected={String(item.id) === String(currentValue)}>
            {item.name}
          </option>
        ))}
      </>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Slide} 
      keepMounted
    >
      <DialogTitle>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg font-semibold text-gray-800"
        >
          ✏️ Edit Student Information
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
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input {...register("first_name")} className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input {...register("last_name")} className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input {...register("email")} className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Telephone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" 
              {...register("telephone")} 
              className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" 
            />
            {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone.message}</p>}
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Program</label>
            <select {...register("course_id")} className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500">
              {renderOptions(courses, "course_id", "Select a Program")}
            </select>
            {errors.course_id && <p className="text-red-500 text-xs mt-1">{errors.course_id.message}</p>}
          </div>
        </motion.form>
      </DialogContent>

      {/* Buttons */}
      <DialogActions className="p-4 flex justify-between bg-gray-100 rounded-b-md">
        <button className="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg" onClick={handleClose}>
          ❌ Cancel
        </button>
        <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={handleSubmit(onSubmit)}>
          💾 Update Student
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudentForm;
