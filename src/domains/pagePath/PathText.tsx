import { palette } from "lib/styles/palette";
import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

type PathTypes = "global" | "folder";

interface PathTextProps {
  pathType: PathTypes;
  children: ReactNode;
  isModal?: boolean;
}

function PathText({ pathType, children, isModal }: PathTextProps) {
  return (
    <PathTextStyled pathType={pathType} isModal={isModal}>
      {children}
    </PathTextStyled>
  );
}

const PathTextStyled = styled.span<{ pathType: PathTypes; isModal?: boolean }>`
  ${(props) =>
    props.pathType === "global"
      ? css`
          font-size: 16px;
          font-weight: normal;
          color: ${palette.grayDarkest};
        `
      : css`
          font-size: 12px;
          font-weight: 500;
          color: ${palette.black};
        `}

  ${({ isModal }) =>
    isModal &&
    css`
      font-size: 12px;
    `}

    
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

export default PathText;
