import Sidebar from "domains/sidebar";
import { scrollbar } from "lib/styles/utilStyles";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { media } from "lib/styles";

function SidebarRouteLayout() {
  return (
    <SidebarRouteLayoutBlock>
      <Sidebar />
      <MainContent>
        <ContentInner>
          <Outlet />
        </ContentInner>
      </MainContent>
    </SidebarRouteLayoutBlock>
  );
}

const SidebarRouteLayoutBlock = styled.div`
  display: flex;
  height: 100%;
  flex: 1 auto;
`;

const MainContent = styled.div`
  flex: 1 auto;
  padding: 20px 0px 0px 28px;
  ${scrollbar}
`;

const ContentInner = styled.div`
  width: 867px;
  ${media.large} {
    width: auto;
  }
`;

export default SidebarRouteLayout;
