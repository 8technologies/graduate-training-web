import Select from "react-select";
import { useState } from "react";
import { Button, Card, LinearProgress } from "@mui/material";

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
    Ahead: "bg-green-500",
    "On Track": "bg-yellow-500",
    "At Risk": "bg-orange-500",
    Behind: "bg-red-500",
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">Student Progress Overview</h1>
      <div className="grid grid-cols-4 gap-6 mb-8">
        {Object.entries(statusColors).map(([status, color]) => (
          <Card key={status} className={`p-6 text-white ${color} shadow-2xl rounded-2xl transform transition-all hover:scale-105 hover:shadow-3xl flex flex-col items-center justify-center`}>
            <h2 className="text-2xl font-bold mb-2">{status}</h2>
            <p className="text-lg">20 students</p>
            <p className="text-3xl font-bold">25%</p>
          </Card>
        ))}
      </div>
      <div className="bg-white p-8 shadow-2xl rounded-xl">
        <table className="w-full border-collapse text-gray-700">
          <thead>
            <tr className="bg-gray-300 text-left text-lg">
              <th className="p-4">Student Name</th>
              <th className="p-4">Level</th>
              <th className="p-4">Program</th>
              <th className="p-4">Supervisor</th>
              <th className="p-4">% Lecture Completion</th>
              <th className="p-4">% Program Minimums</th>
              <th className="p-4">Progress Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition-all text-lg">
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4">{student.group}</td>
                <td className="p-4 text-blue-600 cursor-pointer hover:underline">{student.course}</td>
                <td className="p-4">{student.instructor}</td>
                <td className="p-4">
                  <LinearProgress variant="determinate" value={student.completion} className="h-3 bg-blue-500 rounded-md" />
                </td>
                <td className="p-4">
                  <LinearProgress variant="determinate" value={student.minimums} className="h-3 bg-green-500 rounded-md" />
                </td>
                <td className="p-4">
                  <span className={`px-4 py-2 text-white text-sm font-semibold rounded-full ${statusColors[student.status]} shadow-lg`}>{student.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
