import React, { useState, useEffect } from "react";
import axios from "axios";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

const CountChart = () => {
  const [chartData, setChartData] = useState([
    { name: "Total", count: 0, fill: "#E0E0E0" },
    { name: "PGD", count: 0, fill: "#3B82F6" },
    { name: "Masters", count: 0, fill: "#F59E0B" },
    { name: "PhD", count: 0, fill: "#8B5CF6" },
  ]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/students")
      .then((response) => {
        const students = response.data.data || [];
        const total = students.length;
        // Aggregate counts by student_level_name
        const levelCounts = students.reduce((acc, student) => {
          const level = student.student_level_name;
          if (level && level !== "N/A") {
            acc[level] = (acc[level] || 0) + 1;
          }
          return acc;
        }, {});

        const newData = [
          { name: "Total", count: total, fill: "#E0E0E0" },
          { name: "PGD", count: levelCounts["Post Graduate Diploma"] || 0, fill: "#3B82F6" },
          { name: "Masters", count: levelCounts["Masters"] || 0, fill: "#F59E0B" },
          { name: "PhD", count: levelCounts["PhD"] || 0, fill: "#8B5CF6" },
        ];

        setChartData(newData);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <div className="bg-gray-200 rounded-xl w-full h-full p-6 shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">🎓 Students Statistics</h1>
        <img
          src="/metronic/tailwind/react/media/images/moreDark.png"
          alt="More Options"
          className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Chart Container */}
      <div className="relative w-full h-[75%] flex justify-center items-center mt-4">
        <ResponsiveContainer width="100%" height={320}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="100%"
            barSize={16}
            data={chartData}
          >
            <RadialBar
              background
              dataKey="count"
              fill="#8884d8"
              cornerRadius={10}
              label={{ position: "insideStart", fill: "white", fontSize: 12 }}
              onMouseEnter={(data) => setHoveredItem(data)}
              onMouseLeave={() => setHoveredItem(null)}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Text Updates on Hover */}
        <div className="absolute flex flex-col items-center">
          <img
            src="/metronic/tailwind/react/media/images/graduation.png"
            alt="Graduation"
            className="w-16 h-16 shadow-md rounded-full bg-white p-2"
          />
          {hoveredItem ? (
            <div className="text-center mt-2">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{hoveredItem.name}</h2>
              <p className="text-md font-semibold text-gray-600 dark:text-gray-400">{hoveredItem.count} Students</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm"></p>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-6">
        {chartData.slice(1).map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-5 h-5 rounded-full`} style={{ backgroundColor: item.fill }}></div>
            <h1 className="font-bold text-gray-900 dark:text-white text-lg">{item.count}</h1>
            <h2 className="text-sm text-gray-600 dark:text-gray-400">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountChart;
