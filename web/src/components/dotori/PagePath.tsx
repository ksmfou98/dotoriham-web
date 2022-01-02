import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

function PagePath() {
  return <PagePathBlock>모든 도토리</PagePathBlock>;
}

const PagePathBlock = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.grayDarker};
`;

export default PagePath;
