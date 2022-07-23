import { ItemId } from "@atlaskit/tree";
import React from "react";
import styled from "styled-components";
import { ChildFolder } from ".";
import ChildFolderListItem from "./ChildFolderListItem";

interface Props {
  childFolders: ChildFolder[];
  onToggleSingleChildFolder: (childFolderId: ItemId) => void;
  isCheckedChildFolder: boolean;
}

function ChildFolderList({
  childFolders,
  isCheckedChildFolder,
  onToggleSingleChildFolder,
}: Props) {
  return (
    <ChildFolderListBlock>
      {childFolders.map((childFolder) => (
        <ChildFolderListItem
          key={childFolder.folderId}
          childFolder={childFolder}
          isCheckedChildFolder={isCheckedChildFolder}
          onToggleSingleChildFolder={onToggleSingleChildFolder}
        />
      ))}
    </ChildFolderListBlock>
  );
}

const ChildFolderListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default ChildFolderList;
