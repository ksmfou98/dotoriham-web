import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import DotoriFilterNav from "./DotoriFilterNav";
import DotoriSelectNav from "./DotoriSelectNav";

function DotoriNav() {
  return (
    <DotoriNavBlock>
      <DotoriSelectNav />
      <DotoriFilterNav />
    </DotoriNavBlock>
  );
}

const DotoriNavBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 28px;
  font-size: 12px;
  color: ${palette.grayDarkest};
`;

export default DotoriNav;
