import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { IFolderMenuPosition } from "./FolderList";

interface FolderMenuProps {
  position: IFolderMenuPosition;
  onToggleModal: {
    onToggleFolderMenu: (e: React.MouseEvent) => void;
    onToggleRenameModal: () => void;
    onToggleMoveModal: () => void;
    onToggleDeleteModal: () => void;
  };
}

function FolderMenu({ position, onToggleModal }: FolderMenuProps) {
  const { left, top } = position;
  const {
    onToggleDeleteModal,
    onToggleFolderMenu,
    onToggleMoveModal,
    onToggleRenameModal,
  } = onToggleModal;

  const folderMenus = [
    {
      name: "이름 변경",
      onToggle: onToggleRenameModal,
    },
    {
      name: "이동",
      onToggle: onToggleMoveModal,
    },
    {
      name: "삭제",
      onToggle: onToggleDeleteModal,
    },
  ];

  return (
    <FolderMenuBlock onClick={(e) => onToggleFolderMenu(e)}>
      <FolderMenuInner
        top={top}
        left={left}
        onClick={(e) => e.stopPropagation()}
      >
        {folderMenus.map((menu) => {
          const { name, onToggle } = menu;
          return (
            <FolderMenuItem key={name} onClick={onToggle}>
              {name}
            </FolderMenuItem>
          );
        })}
      </FolderMenuInner>
    </FolderMenuBlock>
  );
}

const FolderMenuBlock = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

const FolderMenuInner = styled.div<IFolderMenuPosition>`
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 9999;
  position: fixed;
  background-color: ${palette.white};
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

const FolderMenuItem = styled.div`
  width: 62px;
  height: 29px;
  padding: 7px 2px 7px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 10px;
  &:hover {
    background-color: ${palette.grayLightest};
    cursor: pointer;
  }
`;

export default FolderMenu;
