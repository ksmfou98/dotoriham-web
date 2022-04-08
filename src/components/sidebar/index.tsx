import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Path from "routes/Path";
import QuestionButton from "components/tutorial/QuestionButton";
import useInitialFolderExpand from "hooks/useInitialFolderExpand";

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [folderId, setFolderId] = useState("");

  useEffect(() => {
    if (params.folderId) setFolderId(params.folderId);
    // @Note 첫 로딩 1번만 실행되야 하기 때문에 deps 비워줌
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInitialFolderExpand(folderId);

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

      <QuestionButton />
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
  margin-bottom: 24px;
  width: 170px;
`;

export default Sidebar;
