import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { DotoriPathTypes } from "types/dotori";
import FolderPath from "./FolderPath";
import GlobalPath from "./GlobalPath";

interface PagePathProps {
  isModal?: boolean;
  path: DotoriPathTypes;
  folderId?: string;
}

function PagePath({ isModal, path, folderId }: PagePathProps) {
  if (path === "folder" && !folderId) {
    console.log("폴더 아이디가 입력되지 않았습니다");
  }

  return (
    <PagePathBlock isModal={isModal}>
      {path === "folder" && folderId ? (
        <FolderPath folderId={folderId} isModal={isModal} />
      ) : (
        <GlobalPath path={path} isModal={isModal} />
      )}
    </PagePathBlock>
  );
}

const PagePathBlock = styled.div<{ isModal?: boolean }>`
  color: ${palette.grayDarkest};
  ${({ isModal }) => !isModal && `margin-bottom: 28px;`};
`;

export default PagePath;
