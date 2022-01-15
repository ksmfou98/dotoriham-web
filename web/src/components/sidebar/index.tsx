import React from "react";
import { palette } from "lib/styles/palette";
import styled from "styled-components";
import FolderList from "./FolderList";
import { scrollbar } from "lib/styles/utilStyles";
import AddFolderButton from "./AddFolderButton";
import SidebarIconName from "./SidebarIconName";
import {
  ListSelectedIcon,
  ListUnSelectedIcon,
  SelectedTrashIcon,
  UnselectedTrashIcon,
} from "assets/icons";

function Sidebar() {
  return (
    <SidebarBlock>
      <SidebarIconName
        isActive
        name="모든 도토리"
        activeIcon={<ListSelectedIcon />}
        unActiveIcon={<ListUnSelectedIcon />}
      />
      <FolderListBox>
        <FolderList />
      </FolderListBox>

      <SidebarIconName
        name="휴지통"
        activeIcon={<SelectedTrashIcon />}
        unActiveIcon={<UnselectedTrashIcon />}
      />

      <AddFolderButton />
    </SidebarBlock>
  );
}

const SidebarBlock = styled.aside`
  position: relative;
  width: 170px;
  background-color: ${palette.white};
  z-index: 2;
  padding: 20px 0;
`;

const FolderListBox = styled.div`
  flex: 1 auto;
  overflow: hidden auto;
  overflow-x: auto;
  margin-bottom: 24px;
  ${scrollbar}
`;

export default Sidebar;
