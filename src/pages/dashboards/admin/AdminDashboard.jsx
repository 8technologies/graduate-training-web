import React, { Fragment, useEffect } from "react";
import { Container } from "@/components/container";
import { Toolbar, ToolbarHeading } from "@/layouts/demo1/toolbar";
import { useAuthContext } from "@/auth";
import { Demo1LightSidebarContent } from "../demo1";

const AdminDashboard = () => {
  const { currentUser, loading } = useAuthContext();

  useEffect(() => {
    console.log("DEBUG: Current User Data ->", currentUser);
  }, [currentUser]);

  if (loading) {
    return (
      <Container>
        <Toolbar>
          <ToolbarHeading title="Loading..." />
        </Toolbar>
      </Container>
    );
  }

  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading title={`Hello, ${currentUser?.first_name || "User"}! You are welcome to the Admin Dashboard`} />
        </Toolbar>
      </Container>

      <Container>
        <Demo1LightSidebarContent />
      </Container>
    </Fragment>
  );
};

export default AdminDashboard;
