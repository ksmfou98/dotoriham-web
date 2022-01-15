import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

interface PagePathProps {
  isModal?: boolean;
}

function PagePath({ isModal }: PagePathProps) {
  return <PagePathBlock isModal={isModal}>모든 도토리</PagePathBlock>;
}

const PagePathBlock = styled.div<{ isModal?: boolean }>`
  font-size: ${({ isModal }) => (isModal ? "14px" : "16px")};
  margin-bottom: 28px;
  color: ${palette.grayDarker};
`;

export default PagePath;
