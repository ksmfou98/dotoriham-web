import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { DotoriPathTypes } from "types/dotori";
import GlobalPath from "./GlobalPath";

interface PagePathProps {
  isModal?: boolean;
  path: DotoriPathTypes;
}

function PagePath({ isModal, path }: PagePathProps) {
  return (
    <PagePathBlock isModal={isModal}>
      {path === "folder" ? <div>폴더</div> : <GlobalPath path={path} />}
    </PagePathBlock>
  );
}

const PagePathBlock = styled.div<{ isModal?: boolean }>`
  font-size: ${({ isModal }) => (isModal ? "12px" : "16px")};
  margin-bottom: 28px;
  color: ${palette.grayDarkest};
`;

export default PagePath;
