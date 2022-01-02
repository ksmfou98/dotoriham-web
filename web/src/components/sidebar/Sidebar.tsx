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
import SearchBar from "./SearchBar";
import DividerLine from "components/common/DividerLine";
import TrashBoxButton from "./TrashBoxButton";

function Sidebar() {
  const { resizeRef, resizingWidth, startResizing } = useResizeWidth(250);

  return (
    <SidebarBlock ref={resizeRef} width={resizingWidth}>
      <LogoBox>
        <Logo />
        <UserButton />
      </LogoBox>

      <SearchBar />
      <Divider />

      <TrashBoxButton />
      <AllDotoriButton />
      <FolderListBox>
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
  padding: 20px;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FolderListBox = styled.div`
  flex: 1 auto;
  height: 100%;
  overflow: hidden auto;
  overflow-x: auto;
  margin-bottom: 24px;
  ${scrollbar}
`;

const Divider = styled(DividerLine)`
  margin: 16px 0;
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
