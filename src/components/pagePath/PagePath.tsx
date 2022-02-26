import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { DotoriPathTypes } from "types/dotori";
import FolderPath from "./FolderPath";
import GlobalPath from "./GlobalPath";

interface PagePathProps {
  isModal?: boolean;
  path: DotoriPathTypes;
}

function PagePath({ isModal, path }: PagePathProps) {
  return (
    <PagePathBlock>
      {path === "folder" ? (
        <FolderPath />
      ) : (
        <GlobalPath path={path} isModal={isModal} />
      )}
    </PagePathBlock>
  );
}

const PagePathBlock = styled.div`
  margin-bottom: 28px;
  color: ${palette.grayDarkest};
`;

export default PagePath;
