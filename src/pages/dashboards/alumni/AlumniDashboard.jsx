import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AlumniDashboard = () => {
  const navigate = useNavigate();

  // Sample Data for Charts
  const engagementData = [
    { month: "Jan", discussions: 20, jobsApplied: 5 },
    { month: "Feb", discussions: 30, jobsApplied: 10 },
    { month: "Mar", discussions: 45, jobsApplied: 15 },
    { month: "Apr", discussions: 35, jobsApplied: 8 },
  ];

  const growthData = [
    { year: "2021", certifications: 5, promotions: 3 },
    { year: "2022", certifications: 8, promotions: 5 },
    { year: "2023", certifications: 12, promotions: 7 },
    { year: "2024", certifications: 15, promotions: 10 },
  ];

  const stats = [
    { icon: "/metronic/tailwind/react/media/images/profile_update.png", label: "Profile Updates", value: 3 },
    { icon: "/metronic/tailwind/react/media/images/forums.webp", label: "Discussions Participated", value: 12 },
    { icon: "/metronic/tailwind/react/media/images/jobs.png", label: "Jobs Applied", value: 5 },
    { icon: "/metronic/tailwind/react/media/images/certificate.png", label: "New Certifications", value: 8 },
  ];

  return (
    <div className="p-8 space-y-8 bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen text-white">
      {/* Header */}
      <motion.div 
        className="flex justify-between items-center p-6 bg-white/10 rounded-lg shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold">🎓 Alumni Dashboard</h1>
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-all" onClick={() => navigate("/alumni/dashboard")}>
          ✏️ Update Profile
        </Button>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-md flex gap-4 items-center border border-white/20"
          >
            <img src={stat.icon} alt={stat.label} className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold">{stat.value}</h1>
              <span className="text-sm text-gray-300">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Engagement Chart */}
      <motion.div
        className="p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">📊 Engagement Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engagementData}>
            <XAxis dataKey="month" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip wrapperStyle={{ backgroundColor: "#ffffff" }} />
            <Bar dataKey="discussions" fill="#38BDF8" name="Discussions" />
            <Bar dataKey="jobsApplied" fill="#D946EF" name="Jobs Applied" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Growth Chart */}
      <motion.div
        className="p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">📈 Alumni Growth Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <XAxis dataKey="year" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip wrapperStyle={{ backgroundColor: "#ffffff" }} />
            <Line type="monotone" dataKey="certifications" stroke="#7DD3FC" name="Certifications" />
            <Line type="monotone" dataKey="promotions" stroke="#FB7185" name="Promotions" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Alumni Engagement Workflow */}
      <motion.div
        className="p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-xl font-semibold">🔄 Alumni Engagements</h2>
        <ul className="mt-4 space-y-4 text-gray-300 text-lg">
          <motion.li whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            ✅ Alumni update their profiles with post-graduation achievements.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            ✅ Engage in discussion forums with the alumni community.
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            ✅ Explore and apply for job opportunities or collaborations.
          </motion.li>
        </ul>
      </motion.div>
    </div>
  );
};

export default AlumniDashboard;
