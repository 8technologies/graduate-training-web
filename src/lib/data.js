export let role = "admin";


const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();
const startOfWeek = today.getDate() - today.getDay(); // Start of this week (Sunday)
const daysOffset = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
]; // Offset for specific days of this week

export const calendarEvents = [
    {
      title: "Advanced Mathematics",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[0], 8, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[0], 8, 45),
    },
    {
      title: "Research Methodology",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[1], 9, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[1], 9, 45),
    },
    {
      title: "Biostatistics",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[2], 10, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[2], 10, 45),
    },
    {
      title: "Quantum Physics",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[3], 11, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[3], 11, 45),
    },
    {
      title: "Organic Chemistry",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[4], 13, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[4], 13, 45),
    },
    {
      title: "Historical Research",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[5], 14, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[5], 14, 45),
    },
    {
      title: "Research Methodology",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[6], 9, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[6], 9, 45),
    },
    {
      title: "Biostatistics",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[7], 10, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[7], 10, 45),
    },
    {
      title: "Quantum Physics",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[8], 11, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[8], 11, 45),
    },
    {
      title: "Historical Research",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[9], 14, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[9], 14, 45),
    },
    {
      title: "Advanced Mathematics",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[10], 8, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[10], 8, 45),
    },
    {
      title: "Biostatistics",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[11], 10, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[11], 10, 45),
    },
    {
      title: "Organic Chemistry",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[12], 13, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[12], 13, 45),
    },
    {
      title: "Historical Research",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[13], 14, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[13], 14, 45),
    },
    {
      title: "Research Methodology",
      allDay: false,
      start: new Date(currentYear, currentMonth, startOfWeek + daysOffset[14], 9, 0),
      end: new Date(currentYear, currentMonth, startOfWeek + daysOffset[14], 9, 45),
    },
  ];

