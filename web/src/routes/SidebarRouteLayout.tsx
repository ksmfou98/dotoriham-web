import Sidebar from "components/sidebar/Sidebar";
import { scrollbar } from "lib/styles/utilStyles";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function SidebarRouteLayout() {
  return (
    <SidebarRouteLayoutBlock>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </SidebarRouteLayoutBlock>
  );
}

const SidebarRouteLayoutBlock = styled.div`
  display: flex;
  height: 100%;
`;

const MainContent = styled.div`
  flex: 1 auto;
  overflow: auto;
  ${scrollbar}
`;

export default SidebarRouteLayout;
