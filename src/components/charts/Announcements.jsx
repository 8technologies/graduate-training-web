import React from "react";

const announcements = [
  {
    title: "Upcoming Semester Registration Now Open!",
    date: "13-02-2025",
    description:
      "All students are reminded to complete their course registration for the upcoming semester before the deadline on March 15.",
    bgColor: "bg-gradient-to-r from-blue-400 to-blue-300",
  },
  {
    title: "Mid-Semester Exams Timetable Released",
    date: "13-02-2025",
    description:
      "The mid-semester exams timetable is now available on the university portal. Please check your exam schedule and prepare accordingly.",
    bgColor: "bg-gradient-to-r from-yellow-400 to-yellow-300",
  },
  {
    title: "University Wi-Fi Maintenance Scheduled",
    date: "13-02-2025",
    description:
      "There will be scheduled maintenance on the university Wi-Fi network on February 20 from 10 PM to 2 AM. Expect intermittent connectivity during this period.",
    bgColor: "bg-gradient-to-r from-green-400 to-green-300",
  },
];

const Announcements = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-3 border-gray-300 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">📢 Announcements</h1>
        <span className="text-xs font-medium text-blue-300 cursor-pointer hover:text-blue-800 transition duration-300">
          View All →
        </span>
      </div>

      {/* Announcements List */}
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md text-white transition-transform transform hover:scale-105 ${announcement.bgColor}`}
          >
            {/* Title & Date */}
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg text-black font-semibold">{announcement.title}</h1>
              <span className="text-xs text-black font-medium bg-white/20 px-3 py-1 rounded-md">
                {announcement.date}
              </span>
            </div>
            {/* Description */}
            <p className="text-sm text-black opacity-90">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
