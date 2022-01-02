import Sidebar from "components/sidebar/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function SidebarRouteLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default SidebarRouteLayout;
