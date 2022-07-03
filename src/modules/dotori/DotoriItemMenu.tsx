import useOutSideClick from "hooks/useOutSideClick";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

interface DotoriItemMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleDeleteModal: () => void;
  onToggleEditModal: () => void;
  onToggleMoveModal: () => void;
}

function DotoriItemMenu({
  isOpen,
  onClose,
  onToggleDeleteModal,
  onToggleEditModal,
  onToggleMoveModal,
}: DotoriItemMenuProps) {
  const { targetEl } = useOutSideClick(isOpen, onClose);

  const dotoriMenus = [
    { name: "이동", onClick: onToggleMoveModal },
    { name: "편집", onClick: onToggleEditModal },
    { name: "삭제", onClick: onToggleDeleteModal },
  ];

  return (
    <DotoriItemMenuBlock ref={targetEl}>
      <DotoriMenuInner>
        {dotoriMenus.map(({ name, onClick }) => (
          <MenuItem
            key={name}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
              onClick();
            }}
          >
            {name}
          </MenuItem>
        ))}
      </DotoriMenuInner>
    </DotoriItemMenuBlock>
  );
}

const DotoriItemMenuBlock = styled.div`
  position: absolute;
  top: 0px;
  left: 24px;
  z-index: 1002;
`;

const DotoriMenuInner = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: ${palette.white};
  z-index: 9999;
`;

const MenuItem = styled.div`
  width: 62px;
  height: 29px;
  font-size: 10px;
  padding: 7px 2px 9px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${palette.grayLightest};
  }
`;

export default DotoriItemMenu;
