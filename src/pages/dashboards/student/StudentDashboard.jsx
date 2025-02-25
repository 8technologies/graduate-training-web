import React, { useState, useEffect } from 'react';
import Announcements from '../../../components/charts/Announcements';
import BigCalendar from '../../../components/charts/BigCalendar';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/students")
      .then(response => response.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          const firstStudent = data.data[0];
          setStudent(`${firstStudent.first_name} ${firstStudent.last_name} (${firstStudent.student_level_name})`);
        }
      })
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  return (
    <div className='p-4 flex flex-col xl:flex-row gap-4 min-h-screen'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3 flex flex-col'>
        <div className='h-full bg-white p-4 rounded-md shadow-md flex flex-col'>
          <h1 className='text-xl font-semibold mb-4'>{student || "Schedule"}</h1>
          <div className='flex-1 overflow-hidden'>
            <BigCalendar className='h-full w-full' />
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>
        <div className='bg-white p-4 rounded-md shadow-md'>
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
