import React from 'react';
// import your sidebar, HeaderTopbar, etc.
import { Sidebar } from '../../../../src/layouts/demo1/sidebar/Sidebar';
import HeaderTopbar from '../../../../src/layouts/demo3/header/HeaderTopbar';

const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Admin-specific Sidebar */}
      <Sidebar role="admin" className="w-64" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Admin-specific HeaderTopbar */}
        <HeaderTopbar role="admin" />
        
        {/* Page Content */}
        <main className="p-4 flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
