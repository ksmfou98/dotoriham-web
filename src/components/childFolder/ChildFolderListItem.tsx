import { ItemId } from "@atlaskit/tree";
import CheckBox from "components/common/CheckBox";
import FolderEmoji from "components/common/FolderEmoji";
import { palette } from "lib/styles/palette";
import { ellipsis } from "lib/styles/utilStyles";
import React from "react";
import { Link } from "react-router-dom";
import Path from "routes/Path";
import styled from "styled-components";
import { ChildFolder } from ".";

interface Props {
  childFolder: ChildFolder;
  onToggleSingleChildFolder: (childFolderId: ItemId) => void;
  isCheckedChildFolder: boolean;
}

function ChildFolderListItem({
  childFolder,
  isCheckedChildFolder,
  onToggleSingleChildFolder,
}: Props) {
  const { name, checked, folderId, emoji } = childFolder;
  return (
    <ChildFolderItemBlock isChecked={checked}>
      <SelectButton
        active={isCheckedChildFolder}
        onClick={() => onToggleSingleChildFolder(folderId)}
        variant="secondary"
        isChecked={checked}
      />

      <FolderEmoji emoji={emoji} />

      <ChildFolderName to={`${Path.DotoriPage}/${folderId}`}>
        {name}
      </ChildFolderName>
      {checked && <SelectedStyled />}
    </ChildFolderItemBlock>
  );
}

const ChildFolderItemBlock = styled.div<{ isChecked: boolean }>`
  width: 174px;
  height: 36px;
  position: relative;
  ${({ isChecked }) => !isChecked && ` border: 1px solid ${palette.grayLight};`}
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${palette.grayDarker};
  margin-right: 24px;
  margin-bottom: 12px;
  padding-right: 8px;
  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const SelectButton = styled(CheckBox)<{ active: boolean }>`
  ${({ active }) => !active && `display:none;`}
  position: absolute;
  top: 5px;
  left: 4px;
  z-index: 50;
`;

const SelectedStyled = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px ${palette.primary};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${palette.shadow1};
  border-radius: 6px;
`;

const ChildFolderName = styled(Link)`
  ${ellipsis}
  display: inline-block;
  max-width: 85px;
  &:hover {
    text-decoration: underline;
  }
`;

export default ChildFolderListItem;
