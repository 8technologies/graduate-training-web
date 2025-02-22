export const MENU_SIDEBAR = [{
  title: 'Home',
  icon: 'ki-duotone ki-home',
  children: [{
    title: 'Light Sidebar',
    path: '/'
  }, {
    title: 'Dark Sidebar',
    path: '/dark-sidebar'
  }]

}, {
  heading: 'Admin'
}, {
  title: 'Students Profile',
  icon: 'profile-circle',
  children: [{
    title: 'Program',
    children: [{
      title: 'Default',
      path: '/public-profile/profiles/default'
    }, {
      title: 'Creator',
      path: '/public-profile/profiles/creator'
    }, {
      title: 'Company',
      path: '/public-profile/profiles/company'
    }, {
      title: 'NFT',
      path: '/public-profile/profiles/nft'
    }, {
      title: 'Blogger',
      path: '/public-profile/profiles/blogger'
    }, {
      title: 'CRM',
      path: '/public-profile/profiles/crm'
    }, {
      title: 'More',
      collapse: true,
      collapseTitle: 'Show less',
      expandTitle: 'Show 4 more',
      dropdownProps: {
        placement: 'right-start'
      },
      children: [{
        title: 'Gamer',
        path: '/public-profile/profiles/gamer'
      }, {
        title: 'Feeds',
        path: '/public-profile/profiles/feeds'
      }, {
        title: 'Plain',
        path: '/public-profile/profiles/plain'
      }, {
        title: 'Modal',
        path: '/public-profile/profiles/modal'
      }]
    }]
  }, {
    title: 'Projects',
    children: [{
      title: '3 Columns',
      path: '/public-profile/projects/3-columns'
    }, {
      title: '2 Columns',
      path: '/public-profile/projects/2-columns'
    }]
  }, {
    title: 'Works',
    path: '/public-profile/works'
  }, {
    title: 'Teams',
    path: '/public-profile/teams'
  }, {
    title: 'Network',
    path: '/public-profile/network'
  }, {
    title: 'Activity',
    path: '/public-profile/activity'
  }, {
    title: 'More',
    collapse: true,
    collapseTitle: 'Show less',
    expandTitle: 'Show 3 more',
    dropdownProps: {
      placement: 'right-start'
    },
    children: [{
      title: 'Campaigns - Card',
      path: '/public-profile/campaigns/card'
    }, {
      title: 'Campaigns - List',
      path: '/public-profile/campaigns/list'
    }, {
      title: 'Empty',
      path: '/public-profile/empty'
    }]
  }]


//MY ACCOUNT

}, {
  title: 'My Account',
  icon: 'setting-2',
  children: [{
    title: 'Account',
    children: [{
      title: 'Get Started',
      path: '/account/home/get-started'
    }, {
      title: 'User Profile',
      path: '/account/home/user-profile'
    }, {
      title: 'Company Profile',
      path: '/account/home/company-profile'
    }, {
      title: 'Settings - With Sidebar',
      path: '/account/home/settings-sidebar'
    }, {
      title: 'Settings - Enterprise',
      path: '/account/home/settings-enterprise'
    }, {
      title: 'Settings - Plain',
      path: '/account/home/settings-plain'
    }, {
      title: 'Settings - Modal',
      path: '/account/home/settings-modal'
    }]
  }, {
    title: 'Billing',
    children: [{
      title: 'Billing - Basic',
      path: '/account/billing/basic'
    }, {
      title: 'Billing - Enterprise',
      path: '/account/billing/enterprise'
    }, {
      title: 'Plans',
      path: '/account/billing/plans'
    }, {
      title: 'Billing History',
      path: '/account/billing/history'
    }]
  }, {
    title: 'Security',
    children: [{
      title: 'Get Started',
      path: '/account/security/get-started'
    }, {
      title: 'Security Overview',
      path: '/account/security/overview'
    }, {
      title: 'Allowed IP Addresses',
      path: '/account/security/allowed-ip-addresses'
    }, {
      title: 'Privacy Settings',
      path: '/account/security/privacy-settings'
    }, {
      title: 'Device Management',
      path: '/account/security/device-management'
    }, {
      title: 'Backup & Recovery',
      path: '/account/security/backup-and-recovery'
    }, {
      title: 'Current Sessions',
      path: '/account/security/current-sessions'
    }, {
      title: 'Security Log',
      path: '/account/security/security-log'
    }]
  }, {
    title: 'Members & Roles',
    children: [{
      title: 'Teams Starter',
      path: '/account/members/team-starter'
    }, {
      title: 'Teams',
      path: '/account/members/teams'
    }, {
      title: 'Team Info',
      path: '/account/members/team-info'
    }, {
      title: 'Members Starter',
      path: '/account/members/members-starter'
    }, {
      title: 'Team Members',
      path: '/account/members/team-members'
    }, {
      title: 'Import Members',
      path: '/account/members/import-members'
    }, {
      title: 'Roles',
      path: '/account/members/roles'
    }, {
      title: 'Permissions - Toggler',
      path: '/account/members/permissions-toggle'
    }, {
      title: 'Permissions - Check',
      path: '/account/members/permissions-check'
    }]
  }, {
    title: 'Integrations',
    path: '/account/integrations'
  }, {
    title: 'Notifications',
    path: '/account/notifications'
  }, {
    title: 'API Keys',
    path: '/account/api-keys'
  }, {
    title: 'More',
    collapse: true,
    collapseTitle: 'Show less',
    expandTitle: 'Show 3 more',
    dropdownProps: {
      placement: 'right-start'
    },
    children: [{
      title: 'Appearance',
      path: '/account/appearance'
    }, {
      title: 'Invite a Friend',
      path: '/account/invite-a-friend'
    }, {
      title: 'Activity',
      path: '/account/activity'
    }]
  }]


// NETWORK


}, {
  title: 'Network',
  icon: 'users',
  children: [{
    title: 'Get Started',
    path: '/network/get-started'
  }, {
    title: 'User Cards',
    children: [{
      title: 'Mini Cards',
      path: '/network/user-cards/mini-cards'
    }, {
      title: 'Team Crew',
      path: '/network/user-cards/team-crew'
    }, {
      title: 'Author',
      path: '/network/user-cards/author'
    }, {
      title: 'NFT',
      path: '/network/user-cards/nft'
    }, {
      title: 'Social',
      path: '/network/user-cards/social'
    }]
  }, {
    title: 'User Table',
    children: [{
      title: 'Team Crew',
      path: '/network/user-table/team-crew'
    }, {
      title: 'App Roster',
      path: '/network/user-table/app-roster'
    }, {
      title: 'Market Authors',
      path: '/network/user-table/market-authors'
    }, {
      title: 'SaaS Users',
      path: '/network/user-table/saas-users'
    }, {
      title: 'Store Clients',
      path: '/network/user-table/store-clients'
    }, {
      title: 'Visitors',
      path: '/network/user-table/visitors'
    }]
  }, {
    title: 'Cooperations',
    path: '/network/cooperations',
    disabled: true
  }, {
    title: 'Leads',
    path: '/network/leads',
    disabled: true
  }, {
    title: 'Donators',
    path: '/network/donators',
    disabled: true
  }]
},
  //END NETWORK


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
  path: '/'
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






