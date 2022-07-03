import React from "react";
import { palette } from "lib/styles/palette";
import styled from "styled-components";
import FolderList from "./FolderList";
import AddFolderButton from "./AddFolderButton";
import SidebarIconName from "./SidebarIconName";
import {
  ListSelectedIcon,
  ListUnSelectedIcon,
  SelectedTrashIcon,
  UnselectedTrashIcon,
} from "assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Path from "routes/Path";
import QuestionButton from "modules/tutorial/QuestionButton";

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarBlock>
      <SidebarIconName
        isActive={pathname === Path.DotoriPage}
        onClick={() => navigate(Path.DotoriPage)}
        name="모든 도토리"
        activeIcon={<ListSelectedIcon />}
        unActiveIcon={<ListUnSelectedIcon />}
      />
      <FolderListBox>
        <FolderList />
      </FolderListBox>

      <AddFolderButton />

      <SidebarIconName
        isActive={pathname === Path.TrashPage}
        onClick={() => navigate(Path.TrashPage)}
        name="휴지통"
        activeIcon={<SelectedTrashIcon />}
        unActiveIcon={<UnselectedTrashIcon />}
      />

      <QuestionButtonBox>
        <QuestionButton />
      </QuestionButtonBox>
    </SidebarBlock>
  );
}

const SidebarBlock = styled.aside`
  position: relative;
  width: 170px;
  background-color: ${palette.white};
  z-index: 2;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

const FolderListBox = styled.div`
  margin-bottom: 24px;
  width: 170px;
`;

const QuestionButtonBox = styled.div`
  flex: 1 0 auto;
  position: relative;
`;

export default Sidebar;
