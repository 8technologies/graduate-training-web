import Select from "react-select";
import { useState } from "react";
import { Card, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

const SupervisorDashboard = () => {
  const [filters, setFilters] = useState({
    course: "All courses",
    profile: "All profiles",
    group: "All groups",
    instructor: "All instructors",
    status: "All statuses",
  });

  const students = [
    { name: "Marvin Saunders", group: "Masters", course: "Software Engineering", instructor: "Moses", completion: 80, minimums: 90, status: "Ahead" },
    { name: "Lillie Spencerson", group: "PhD", course: "Cyber Security", instructor: "Moses", completion: 75, minimums: 85, status: "Ahead" },
    { name: "Barry Fields", group: "Bachelors", course: "Artificial Intelligence", instructor: "Moses", completion: 60, minimums: 70, status: "On Track" },
    { name: "Clarence Norton", group: "Masters", course: "Data Science", instructor: "Moses", completion: 40, minimums: 60, status: "At Risk" },
    { name: "Dale Saunders", group: "Bachelors", course: "Blockchain Technology", instructor: "Moses", completion: 30, minimums: 50, status: "Behind" },
  ];

  const statusColors = {
    Ahead: "from-green-500 to-green-400",
    "On Track": "from-yellow-500 to-yellow-400",
    "At Risk": "from-orange-500 to-orange-400",
    Behind: "from-red-500 to-red-400",
  };

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header Section */}
      <motion.h1 
        className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        🎓 Student Progress Overview
      </motion.h1>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(statusColors).map(([status, color]) => (
          <motion.div
            key={status}
            className={`p-6 text-white shadow-2xl rounded-2xl transform transition-all hover:scale-105 hover:shadow-3xl bg-gradient-to-r ${color} flex flex-col items-center justify-center`}
            whileHover={{ scale: 1.1 }}
          >
            <h2 className="text-2xl font-bold mb-2">{status}</h2>
            <p className="text-lg">20 students</p>
            <p className="text-3xl font-bold">25%</p>
          </motion.div>
        ))}
      </div>

      {/* Student Table */}
      <motion.div 
        className="bg-white/10 p-8 shadow-2xl rounded-xl backdrop-blur-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-left text-lg">
              <th className="p-4 rounded-tl-lg">👤 Student Name</th>
              <th className="p-4">📚 Level</th>
              <th className="p-4">📖 Program</th>
              <th className="p-4">👨‍🏫 Supervisor</th>
              <th className="p-4">% 📅 Completion</th>
              <th className="p-4">% 📌 Minimums</th>
              <th className="p-4 rounded-tr-lg">🔹 Progress Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <motion.tr 
                key={index} 
                className="border-b border-gray-500 hover:bg-gray-700 transition-all text-lg"
                whileHover={{ scale: 1.02 }}
              >
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4">{student.group}</td>
                <td className="p-4 text-blue-300 cursor-pointer hover:underline">{student.course}</td>
                <td className="p-4">{student.instructor}</td>
                <td className="p-4">
                  <LinearProgress variant="determinate" value={student.completion} className="h-3 rounded-md bg-blue-500" />
                </td>
                <td className="p-4">
                  <LinearProgress variant="determinate" value={student.minimums} className="h-3 rounded-md bg-green-500" />
                </td>
                <td className="p-4">
                  <span className={`px-4 py-2 text-white text-sm font-semibold rounded-full shadow-lg bg-gradient-to-r ${statusColors[student.status]}`}>
                    {student.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default SupervisorDashboard;
