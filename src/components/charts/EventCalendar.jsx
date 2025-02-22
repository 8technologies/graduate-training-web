import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const events = [
  {
    id: 1,
    title: "Thesis Defense",
    time: "2:00 PM - 4:00 PM",
    description: "Thesis defense for the PhD students",
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Proposal Submission",
    time: "10:00 AM - 12:00 PM",
    description: "Submission of proposals for the Master students in Room 3A",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Concept Note Submission",
    time: "8:00 AM - 4:00 PM",
    description: "Submission of concept notes for PGD students in registrar's office",
    color: "bg-orange-500",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      {/* 📅 Calendar Section */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-inner dark:bg-gray-800">
        <Calendar
          onChange={onChange}
          value={value}
          className="rounded-lg border-none"
        />
      </div>

      {/* 📌 Events Header */}
      <div className="flex items-center justify-between mt-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">📅 Upcoming Events</h1>
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
          <img src="/metronic/tailwind/react/media/images/moreDark.png" alt="More" width={20} height={20} />
        </button>
      </div>

      {/* 🗂 Event List */}
      <div className="flex flex-col gap-4 mt-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800"
          >
            {/* 🔹 Event Header with Color */}
            <div className={`absolute top-0 left-0 w-full h-2 ${event.color} rounded-t-lg`}></div>

            {/* 🏷 Title & Time */}
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-700 dark:text-gray-300">{event.title}</h1>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-md dark:bg-gray-700">
                {event.time}
              </span>
            </div>

            {/* 📝 Description */}
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
