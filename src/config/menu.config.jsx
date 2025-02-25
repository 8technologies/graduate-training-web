export const MENU_SIDEBAR = [{
  title: 'Home',
  icon: 'ki-duotone ki-home',
  children: [{
    title: 'Light Sidebar',
    path: '/admin/dashboard'
  }, {                                                                        //menu.config
    title: 'Dark Sidebar',
    path: '/dark-sidebar'
  }]

}, {
  heading: 'Admin'
}, 

  //START OF GTTS SIDE MENU
  //add a student sidebar menu 
  {
    title: 'Supervisors',
    icon: 'ki-duotone ki-users', // Represents supervision or approval
    path: '/list/supervisors',
  },
  
  {
    title: 'Students',
    icon: 'ki-duotone ki-teacher', // Represents students and education
    path: '/list/students',
  },
  
  {
    title: 'Alumnis',
    icon: 'ki-duotone ki-people', // Represents alumni in a professional context
    path: '/list/alumnis',
  },
  
  {
    title: 'Programs',
    icon: 'book-open', // Represents educational programs or courses
    path: '/programs',
  },
  
  {
    title: 'Scheduled Trainings',
    icon: 'ki-duotone ki-calendar-8', // Represents scheduled sessions or training
    path: '/trainings',
  },
  
  {
    title: 'Events',
    icon: 'ki-duotone ki-calendar-search', // Represents events and scheduling
    path: '/events',
  },
  
  {
    title: 'Announcements',
    icon: 'ki-duotone ki-message-notify', // Represents news or announcements
    path: '/announcements',
  },

  {
    title: 'Settings',
    icon: 'ki-duotone ki-setting-4',
    children: [
      {
        title: 'User Management',
        icon: 'ki-duotone ki-user-check',
        path: '/settings/user-management'
      },
      {
        title: 'Roles & Permissions',
        icon: 'ki-duotone ki-shield',
        path: '/settings/roles-permissions'
      },
      {
        title: 'System Configuration',
        icon: 'ki-duotone ki-cog',
        path: '/settings/system-config'
      },
      {
        title: 'Audit Logs',
        icon: 'ki-duotone ki-clipboard-list',
        path: '/settings/audit-logs'
      },
      {
        title: 'Notification Settings',
        icon: 'ki-duotone ki-bell',
        path: '/settings/notifications'
      }
    ]
  }
  
];

//TOP PART OF THE MENU
export const MENU_MEGA = [
  {
  title: 'Home',
  path: '/admin/dashboard'
},

{
  title: 'My Profile',
  path: '/'
},

{
  title: 'My Account',
  path: '/'
},

{}, 

{}, 

{}

];






