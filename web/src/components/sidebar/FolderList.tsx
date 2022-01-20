import React, { ReactElement, useEffect, useRef, useState } from "react";
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
import { palette } from "lib/styles/palette";
import { scrollbar } from "lib/styles/utilStyles";
import useFolderListQuery from "hooks/folder/useFolderListQuery";

function FolderList() {
  const [folders, setFolders] = useState<TreeData>({
    rootId: "",
    items: {
      "": {
        id: "",
        children: [],
        data: "",
      },
    },
  });

  const { data } = useFolderListQuery("sidebar");

  useEffect(() => {
    if (!data) return;
    setFolders(data);
  }, [data]);

  const folderBoxRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [folderBoxHeight, setFolderBoxHeight] = useState(0);

  const onMouseDownFolder = () => {
    setIsDragging(true);
    if (folderBoxRef.current) {
      setFolderBoxHeight(folderBoxRef.current.clientHeight + 10);
    }
  };

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
    setIsDragging(false);
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
            onMouseDown={onMouseDownFolder}
            onMouseUp={() => setIsDragging(false)}
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
              <FolderTitle>{item.data.name}</FolderTitle>
            </FolderLeftBox>
          </FolderItemBlock>
        </FolderItemWrapper>
      </>
    );
  };

  return (
    <FolderListWrapper
      folderBoxHeight={folderBoxHeight}
      isDragging={isDragging}
      ref={folderBoxRef}
    >
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

const FolderListWrapper = styled.div<{
  folderBoxHeight: number;
  isDragging: boolean;
}>`
  ${(props) => props.isDragging && `height: ${props.folderBoxHeight}px;`}
  position: relative;
  max-height: 530px;
  overflow: hidden auto;
  overflow-x: auto;
  ${scrollbar}
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
  line-height: 28px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;

export default FolderList;
