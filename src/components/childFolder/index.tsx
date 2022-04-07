import React, { useEffect, useMemo, useState } from "react";
import { ItemId } from "@atlaskit/tree";
import styled from "styled-components";
import useChildFoldersQuery from "./hooks/useChildFoldersQuery";
import ChildFolderSelectNav from "./ChildFolderSelectNav";
import { ChildFolderItem } from "types/folder";
import ChildFolderList from "./ChildFolderList";

interface Props {
  folderId: ItemId;
}

export interface ChildFolder extends ChildFolderItem {
  checked: boolean;
}

function ChildFolders({ folderId }: Props) {
  const [childFolderList, setChildFolderList] = useState<ChildFolder[]>([]);

  const { data } = useChildFoldersQuery(folderId);

  useEffect(() => {
    if (!data) return;
    setChildFolderList(
      data.map((childFolder) => ({ ...childFolder, checked: false }))
    );
  }, [data]);

  const isAllCheckedChildFolder = useMemo(() => {
    if (!childFolderList.length) return false;
    return childFolderList.every((childFolder) => childFolder.checked);
  }, [childFolderList]);

  const isCheckedChildFolder = useMemo(() => {
    return childFolderList.some((childFolder) => childFolder.checked);
  }, [childFolderList]);

  const onToggleAllChildFolder = () => {
    setChildFolderList(
      childFolderList.map((childFolder) => ({
        ...childFolder,
        checked: !isAllCheckedChildFolder,
      }))
    );
  };

  const onToggleSingleChildFolder = (childFolderId: ItemId) => {
    setChildFolderList(
      childFolderList.map((childFolder) =>
        childFolder.folderId === childFolderId
          ? { ...childFolder, checked: !childFolder.checked }
          : childFolder
      )
    );
  };

  if (!data) return null;
  return (
    <ChildFoldersBlock>
      <ChildFolderSelectNav
        onToggleAllChildFolder={onToggleAllChildFolder}
        isAllChecked={isAllCheckedChildFolder}
        isCheckedChildFolder={isCheckedChildFolder}
      />

      <ChildFolderList
        childFolders={childFolderList}
        isCheckedChildFolder={isCheckedChildFolder}
        onToggleSingleChildFolder={onToggleSingleChildFolder}
      />
    </ChildFoldersBlock>
  );
}

const ChildFoldersBlock = styled.div`
  margin-bottom: 19px;
`;

export default ChildFolders;
