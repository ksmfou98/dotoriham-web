import { ListSelectedIcon, ListUnSelectedIcon } from "assets/icons";
import { palette } from "lib/styles/palette";
import React from "react";
import styled, { css } from "styled-components";

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
  margin-bottom: 6px;
`;

const AllDotoriButtonIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 6px;
`;

const AllDotoriButtonText = styled.span<{ active: boolean }>`
  height: 100%;
  font-size: 14px;
  line-height: 21px;
  ${({ active }) =>
    active
      ? css`
          color: ${palette.primary};
          font-weight: 500;
        `
      : css`
          color: #9d9c9c;
          font-weight: 400;
        `}
`;

export default AllDotoriButton;
