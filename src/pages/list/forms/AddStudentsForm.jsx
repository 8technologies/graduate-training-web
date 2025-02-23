import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Slide } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion"; // ✅ Add animations

// ✅ Schema Validation with Number Validation for Telephone
const schema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  telephone: z
  .string()
  .length(10, "Phone number must be exactly 10 digits"),// ✅ Must be exactly 10 digits
  university_id: z.string().nonempty("Select a university"),
  course_id: z.string().nonempty("Select a Program"),
  student_level_id: z.string().nonempty("Select a Student Level"),
});

const AddStudentsForm = ({ open, handleClose, onStudentAdded }) => {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentLevels, setStudentLevels] = useState([]);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ Fetch Data
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/universities")
      .then((response) => setUniversities(response.data.data || []))
      .catch(() => toast.error("Failed to fetch universities"));

    axios.get("http://127.0.0.1:8000/api/courses")
      .then((response) => setCourses(response.data.data || []))
      .catch(() => toast.error("Failed to fetch courses"));

    axios.get("http://127.0.0.1:8000/api/studentlevels")
      .then((response) => setStudentLevels(response.data.data || []))
      .catch(() => toast.error("Failed to fetch student levels"));
  }, []);

  // ✅ Form Submission
  const onSubmit = async (data, event) => {
    event.preventDefault(); // ✅ Prevents full page reload

    const studentData = {
      ...data,
      role_id: "1", // ✅ Always assign student role
      password: "pass123", // ✅ Auto-generate password
      password_confirmation: "pass123",
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/students", studentData);
      if (response.data.data) {
        toast.success("🎉 Student added successfully!");
        onStudentAdded(response.data.data);
        reset();
        handleClose();
      } else {
        toast.error("❌ Failed to add student!");
      }
    } catch (error) {
      console.error("❌ API Error:", error.response ? error.response.data : error);
      toast.error(`Oops! ${error.response?.data?.error || "Unknown error"}`);
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
      <DialogTitle className="text-center font-bold text-xl bg-blue-600 text-white p-4 rounded-t-lg">
        ✨ Add New Student
      </DialogTitle>

      <DialogContent className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-md shadow-md">
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

          {/* University */}
          <div>
            <label className="block text-sm font-medium text-gray-700">🏫 University</label>
            <select {...register("university_id")} className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="">Select University</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
            {errors.university_id && <p className="text-red-500 text-xs mt-1">{errors.university_id.message}</p>}
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700">📚 Program</label>
            <select {...register("course_id")} className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="">Select a Program</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.course_id && <p className="text-red-500 text-xs mt-1">{errors.course_id.message}</p>}
          </div>

          {/* Student Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700">🎓 Student Level</label>
            <select {...register("student_level_id")} className="input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="">Select Student Level</option>
              {studentLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
            {errors.student_level_id && <p className="text-red-500 text-xs mt-1">{errors.student_level_id.message}</p>}
          </div>
        </motion.form>
      </DialogContent>

      {/* Buttons */}
      <DialogActions className="p-4 flex justify-between bg-gray-100 rounded-b-md">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          onClick={handleClose}
        >
          ❌ Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={handleSubmit(onSubmit)}
        >
          🎓 Add Student
        </motion.button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentsForm;
