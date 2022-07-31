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
  TrashBallonIcon,
  UnselectedTrashIcon,
} from "assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Path from "routes/Path";
import QuestionButton from "domains/@global/tutorial/QuestionButton";
import { media, transitions } from "lib/styles";

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
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

      <TrashBoxWrapper>
        <SidebarIconName
          isActive={pathname === Path.TrashPage}
          onClick={() => navigate(Path.TrashPage)}
          name="휴지통"
          activeIcon={<SelectedTrashIcon />}
          unActiveIcon={<UnselectedTrashIcon />}
        />
        <TrashBallonBox>
          <TrashBallonIcon />
          <TrashBallonText>
            휴지통의 도토리는
            <br /> 30일 뒤 완전히 사라져요!
          </TrashBallonText>
        </TrashBallonBox>
      </TrashBoxWrapper>

      <QuestionButtonBox>
        <QuestionButton />
      </QuestionButtonBox>
    </Container>
  );
}

const Container = styled.aside`
  position: relative;
  width: 170px;
  background-color: ${palette.white};
  z-index: 2;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  ${media.medium} {
    display: none;
  }
`;

const FolderListBox = styled.div`
  margin-bottom: 24px;
  width: 170px;
`;

const QuestionButtonBox = styled.div`
  flex: 1 0 auto;
  position: relative;
`;

const TrashBallonBox = styled.div`
  position: relative;
  display: none;
  animation: ${transitions.fadeIn} 0.4s ease-in-out;
`;

const TrashBallonText = styled.span`
  position: absolute;
  top: 17px;
  left: 13px;
  font-size: 10px;
  line-height: normal;
  color: ${palette.grayDarkest};
`;

const TrashBoxWrapper = styled.div`
  &:hover ${TrashBallonBox} {
    display: block;
  }
`;

export default Sidebar;
