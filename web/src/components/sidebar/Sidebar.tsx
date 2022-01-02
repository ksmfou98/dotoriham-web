import React from "react";
import Logo from "components/common/Logo";
import useResizeWidth from "hooks/common/useResizeWidth";
import { palette } from "lib/styles/palette";
import styled from "styled-components";
import AllDotoriButton from "./AllDotoriButton";
import FolderList from "./FolderList";
import { scrollbar } from "lib/styles/utilStyles";
import AddFolderButton from "./AddFolderButton";
import UserButton from "./UserButton";

function Sidebar() {
  const { resizeRef, resizingWidth, startResizing } = useResizeWidth(250);

  return (
    <SidebarBlock
      ref={resizeRef}
      width={resizingWidth}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Logo />

      <SidebarMenuBox>
        <UserButton />
      </SidebarMenuBox>

      <FolderListBox>
        <AllDotoriButton />
        <FolderList />
      </FolderListBox>
      <AddFolderButton />
      <SidebarResizer onMouseDown={startResizing} />
    </SidebarBlock>
  );
}

const SidebarBlock = styled.aside<{ width: number }>`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 150px;
  max-width: 40%;
  width: ${({ width }) => width}px;
  height: 100%;
  background-color: ${palette.white};
  border-right: 1px solid ${palette.grayLight};
  z-index: 2;
  padding: 20px 10px 20px 20px;
`;

const SidebarMenuBox = styled.div`
  margin-top: 10px;
  margin-bottom: 4px;
  padding: 4px 12px;
`;

const FolderListBox = styled.div`
  flex: 1 auto;
  max-height: 100%;
  overflow: hidden auto;
  overflow-x: auto;
  margin-bottom: 24px;
  margin-top: 8px;
  ${scrollbar}
`;

const SidebarResizer = styled.div`
  position: absolute;
  right: -3px;
  top: 0;
  bottom: 0;
  width: 10px;
  cursor: ew-resize;
  &:hover {
    background-color: ${palette.grayLight};
  }
`;

export default Sidebar;
