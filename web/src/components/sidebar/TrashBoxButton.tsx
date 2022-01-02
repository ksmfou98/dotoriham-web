import { SelectedTrashIcon, UnselectedTrashIcon } from "assets/icons";
import { palette } from "lib/styles/palette";
import React from "react";
import styled, { css } from "styled-components";

function TrashBoxButton() {
  const isActive = false;

  return (
    <TrashBoxButtonBlock>
      <TrashIconBox>
        {isActive ? <SelectedTrashIcon /> : <UnselectedTrashIcon />}
      </TrashIconBox>
      <TrashText active={isActive}>휴지통</TrashText>
    </TrashBoxButtonBlock>
  );
}

const TrashBoxButtonBlock = styled.button`
  display: flex;
  height: 21px;
  width: 166px;
  margin-bottom: 6px;
`;

const TrashIconBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 6px;
`;

const TrashText = styled.span<{ active: boolean }>`
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

export default TrashBoxButton;
