import { palette } from "lib/styles/palette";
import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

type PathTypes = "global" | "folder";

interface PathTextProps {
  pathType: PathTypes;
  children: ReactNode;
}

function PathText({ pathType, children }: PathTextProps) {
  return <PathTextStyled pathType={pathType}>{children}</PathTextStyled>;
}

const PathTextStyled = styled.span<{ pathType: PathTypes }>`
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
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

export default PathText;
