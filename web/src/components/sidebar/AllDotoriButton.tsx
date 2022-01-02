import { ListSelectedIcon, ListUnSelectedIcon } from "assets/icons";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

function AllDotoriButton() {
  const isActive = true;
  return (
    <AllDotoriButtonBlock>
      <AllDotoriButtonIcon>
        {isActive ? <ListSelectedIcon /> : <ListUnSelectedIcon />}
      </AllDotoriButtonIcon>
      <AllDotoriButtonText active={isActive}>모든 도토리</AllDotoriButtonText>
    </AllDotoriButtonBlock>
  );
}

const AllDotoriButtonBlock = styled.button`
  display: flex;
  height: 21px;
  width: 166px;
  margin-bottom: 4px;
`;

const AllDotoriButtonIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 6px;
`;

const AllDotoriButtonText = styled.span<{ active: boolean }>`
  height: 100%;
  color: ${({ active }) => (active ? palette.primary : palette.grayDarker)};
  ${({ active }) => active && "font-weight: 500;"}
  font-size: 14px;
`;

export default AllDotoriButton;
