import React, { useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Total", count: 600, fill: "#E0E0E0" },
  { name: "PGD", count: 250, fill: "#3B82F6" },
  { name: "Masters", count: 200, fill: "#F59E0B" },
  { name: "PhD", count: 150, fill: "#8B5CF6" },
];

const CountChart = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="bg-gray-200 rounded-xl w-full h-full p-6 shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      {/* 📌 Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">🎓 Students Statistics</h1>
        <img
          src="/metronic/tailwind/react/media/images/moreDark.png"
          alt="More Options"
          className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* 📊 Chart Container */}
      <div className="relative w-full h-[75%] flex justify-center items-center mt-4">
        <ResponsiveContainer width="100%" height={320}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="100%"
            barSize={16}
            data={data}
          >
            <RadialBar
              background
              dataKey="count"
              fill="#8884d8"
              cornerRadius={10}
              label={{ position: "insideStart", fill: "white", fontSize: 12 }}
              onMouseEnter={(data) => setHoveredItem(data)} // ✅ Store hovered item
              onMouseLeave={() => setHoveredItem(null)} // ✅ Clear on leave
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

        {/* 🎓 Center Text Updates on Hover */}
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

      {/* 📌 Improved Legend */}
      <div className="flex justify-between mt-6">
        {data.slice(1).map((item, index) => (
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
