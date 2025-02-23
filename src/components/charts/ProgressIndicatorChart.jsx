"use client";
import { PieChart, Pie, ResponsiveContainer } from 'recharts';


const data = [
  { name: 'Completed', value: 90, fill: '#C3EBFA' },
  { name: 'Remaining', value: 8, fill: '#FAE27C' },
];

const ProgressIndicatorChart = () => {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative flex flex-col items-center justify-center">
      {/* HEADER */}
      <div className="flex justify-between w-full">
        {/* <h1 className="text-xl font-semibold">Performance</h1> */}
        <img src="/metronic/tailwind/react/media/images/moreDark.png" alt="" width={16} height={16} />
      </div>

      {/* PIE CHART */}
      <div className="relative w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="50%"
              innerRadius={70}
              
              fill="#8884d8"
            />
          </PieChart>
        </ResponsiveContainer>

        {/* CENTERED TEXT */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 text-center">
          <h1 className="text-3xl font-bold">9.2%</h1>
          <p className="text-xs text-gray-400">Work Rate</p>
        </div>
        <h2 className='font-medium absolute bottom-16 left-0 right-0 text-center' >1st Semester - 2nd Semester</h2>
      </div>
    </div>
  );
};

export default ProgressIndicatorChart;
