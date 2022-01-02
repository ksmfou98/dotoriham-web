import React, { ReactElement, useState } from "react";
import Tree, {
  ItemId,
  moveItemOnTree,
  mutateTree,
  RenderItemParams,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
} from "@atlaskit/tree";
import styled from "styled-components";
import FolderItemIcon from "components/sidebar/FolderItemIcon";
import initialFolderState from "./mockData.json";
import { palette } from "lib/styles/palette";

function FolderList() {
  const [folders, setFolders] = useState<TreeData>(initialFolderState);

  // 폴더 확장
  const onExpandFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
  };

  // 폴더 접기
  const onCollapseFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  const onDragStartFolder = (itemId: ItemId) => {
    // eslint-disable-next-line no-console
    console.log(itemId);
  };

  const onDragEndFolder = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    if (!destination) return;
    const newTree = moveItemOnTree(folders, source, destination);
    // console.log('새로운 부모Id', destination);
    // console.log('기존 부모Id', source);
    setFolders(newTree);
  };

  // 각 폴더 아이템
  const renderFolderItem = ({
    item,
    onExpand,
    onCollapse,
    provided,
  }: RenderItemParams): ReactElement => {
    return (
      <>
        <FolderItemWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <FolderItemBlock
            onClick={() =>
              item.children.length > 0 && item.isExpanded
                ? onCollapse(item.id)
                : onExpand(item.id)
            }
          >
            <FolderLeftBox>
              <FolderItemIcon
                item={item}
                onCollapse={onCollapse}
                onExpand={onExpand}
              />
              <FolderTitle>{item.data.title}</FolderTitle>
            </FolderLeftBox>
          </FolderItemBlock>
        </FolderItemWrapper>
      </>
    );
  };

  return (
    <FolderListWrapper>
      <Tree
        tree={folders}
        renderItem={renderFolderItem}
        onExpand={onExpandFolder}
        onCollapse={onCollapseFolder}
        onDragStart={onDragStartFolder}
        onDragEnd={onDragEndFolder}
        offsetPerLevel={16} // 한 깊이당 padding 값
        isNestingEnabled
        isDragEnabled
      />
    </FolderListWrapper>
  );
}

const FolderListWrapper = styled.div`
  position: relative;
`;

const FolderItemWrapper = styled.div`
  width: 166px;
`;

const FolderRightBox = styled.div`
  display: none;
  align-items: center;
`;

const FolderItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-width: 105px;
  max-width: 166px;
  height: 28px;
  font-size: 12px;
  padding: 5px 2px;
  border-radius: 4px;
  &:hover {
    background-color: ${palette.hover0};
    font-weight: 500;
    ${FolderRightBox} {
      display: flex;
    }
  }
`;

const FolderLeftBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 65px;
`;

const FolderTitle = styled.span`
  cursor: pointer;
  height: 28px;
  line-height: 25px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;

export default FolderList;
