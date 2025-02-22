import { Fragment } from "react";
import { toAbsoluteUrl } from "@/utils/Assets";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation

const ChannelStats = () => {
  const items = [
    {
      logo: "/metronic/tailwind/react/media/images/programs.png",
      info: "5",
      desc: "Programs",
      path: "/programs", // ✅ Link to Programs List
    },
    {
      logo: "/metronic/tailwind/react/media/images/superviso1.png",
      info: "20",
      desc: "Supervisors",
      path: "/list/supervisors", // ✅ Link to Supervisors List
    },
    {
      logo: "/metronic/tailwind/react/media/images/students1.png",
      info: "608",
      desc: "Students",
      path: "/list/students", // ✅ Link to Students List
    },
    {
      logo: "/metronic/tailwind/react/media/images/alumniss.png",
      info: "100",
      desc: "Alumnis",
      path: "/list/alumnis", // ✅ Link to Alumnis List
    },
  ];

  const renderItem = (item, index) => {
    return (
      <Link to={item.path} key={index} className="block"> {/* ✅ Makes the whole item clickable */}
        <div className="card flex flex-col justify-between gap-6 h-full bg-cover bg-no-repeat p-4 shadow-lg rounded-lg channel-stats-bg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
          {/* ✅ Image */}
          <img
            src={item.logo}
            className="w-12 h-12 mt-4 ml-5 object-contain"
            alt={item.desc}
            onError={(e) => console.error("Image not found:", e.target.src)}
          />

          {/* ✅ Info Text */}
          <div className="flex flex-col gap-1 pb-4 px-5">
            <span className="text-3xl font-semibold text-gray-900">{item.info}</span>
            <span className="text-sm font-normal text-gray-700">{item.desc}</span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Fragment>
      <style>
        {`
          .channel-stats-bg {
            background-image: url('${toAbsoluteUrl("/media/images/2600x1600/bg-3.png")}');
          }
          .dark .channel-stats-bg {
            background-image: url('${toAbsoluteUrl("/media/images/2600x1600/bg-3-dark.png")}');
          }
        `}
      </style>

      {items.map((item, index) => renderItem(item, index))}
    </Fragment>
  );
};

export { ChannelStats };
