import React, { ReactElement, useEffect, useRef, useState } from "react";
import Tree, {
  ItemId,
  moveItemOnTree,
  mutateTree,
  RenderItemParams,
  TreeDestinationPosition,
  TreeSourcePosition,
} from "@atlaskit/tree";
import styled from "styled-components";
import FolderItemIcon from "components/sidebar/FolderItemIcon";
import { palette } from "lib/styles/palette";
import { scrollbar } from "lib/styles/utilStyles";
import useFolderListQuery from "components/sidebar/hooks/useFolderListQuery";
import { useDispatch, useSelector } from "react-redux";
import { folderSelector, setFolders } from "stores/folder";
import { More16Icon, PlusIcon } from "assets/icons";
import FolderMenu from "./FolderMenu";
import useToggle from "hooks/useToggle";
import FolderRenameModal from "./FolderRenameModal";
import useCreateFolder from "components/sidebar/hooks/useCreateFolder";
import SmallModal from "components/common/SmallModal";
import useDeleteFolder from "components/sidebar/hooks/useDeleteFolder";
import { findChildrenLengthById } from "lib/utils/atlaskitTreeFinder";
import { moveFolderAPI } from "lib/api/folder";
import { useLocation, useNavigate } from "react-router-dom";
import Path from "routes/Path";
import { useQueryClient } from "react-query";
import { QueryKey } from "lib/queryKey";

export interface IFolderMenuPosition {
  top: number;
  left: number;
}

function FolderList() {
  const folders = useSelector(folderSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data } = useFolderListQuery("sidebar");
  const queryClient = useQueryClient();

  const folderBoxRef = useRef<HTMLDivElement>(null);
  const [draggingFolderId, setDraggingFolderId] = useState<ItemId | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [folderBoxHeight, setFolderBoxHeight] = useState(0);
  const [isSelectedFolderId, setIsSelectedFolderId] = useState<ItemId>(0);

  // modal state
  const [isFolderMenu, setIsFolderMenu] = useState(false);
  const [isRenameModal, onToggleRenameModal] = useToggle();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMoveModal, onToggleMoveModal] = useToggle();
  const [isDeleteModal, onToggleDeleteModal] = useToggle();

  const [folderMenuPosition, setFolderMenuPosition] =
    useState<IFolderMenuPosition>({
      top: 0,
      left: 0,
    });

  const { onCreateFolder } = useCreateFolder();
  const { mutateDeleteFolder } = useDeleteFolder(isSelectedFolderId);

  useEffect(() => {
    if (!data) return;
    dispatch(setFolders(data));
  }, [data, dispatch]);

  const onChangeSelectedFolderId = (id: ItemId) => {
    setIsSelectedFolderId(id);
  };

  const onToggleFolderMenu = (e: React.MouseEvent) => {
    setIsFolderMenu(!isFolderMenu);
    setFolderMenuPosition({
      top: e.currentTarget.getBoundingClientRect().top,
      left: e.currentTarget.getBoundingClientRect().left,
    });
  };

  const onToggleModal = {
    onToggleFolderMenu,
    onToggleRenameModal,
    onToggleMoveModal,
    onToggleDeleteModal,
  };

  const onMouseDownFolder = () => {
    setIsDragging(true);
    if (folderBoxRef.current) {
      setFolderBoxHeight(folderBoxRef.current.clientHeight + 10);
    }
  };

  // 폴더 확장
  const onExpandFolder = (itemId: ItemId) => {
    dispatch(setFolders(mutateTree(folders, itemId, { isExpanded: true })));
  };

  // 폴더 접기
  const onCollapseFolder = (itemId: ItemId) => {
    dispatch(setFolders(mutateTree(folders, itemId, { isExpanded: false })));
  };

  const onDragStartFolder = (itemId: ItemId) => {
    setDraggingFolderId(itemId);
  };

  // @Note destination: 새로운 부모, source: 이전 부모
  const onDragEndFolder = async (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    if (!destination) return;
    if (!draggingFolderId) return;

    const newTree = moveItemOnTree(folders, source, destination);
    setIsDragging(false);

    const prevParentId = source.parentId;
    const prevIndex = source.index;
    const nextParentId = destination.parentId;
    const nextIndex =
      destination.index === undefined
        ? findChildrenLengthById(folders, nextParentId)
        : destination.index;

    const body = {
      moveFolderId: draggingFolderId,
      prevParentId,
      nextParentId,
      prevIndex,
      nextIndex,
    };

    dispatch(setFolders(newTree));
    try {
      await moveFolderAPI(body);
      queryClient.invalidateQueries(QueryKey.CHILD_FOLDER_LIST);
    } catch (e) {
      console.log("폴더 이동에 실패했습니다.");
    }
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
            // onClick={() =>
            //   item.children.length > 0 && item.isExpanded
            //     ? onCollapse(item.id)
            //     : onExpand(item.id)
            // }
          >
            <FolderLeftBox>
              <FolderItemIcon
                item={item}
                onCollapse={onCollapse}
                onExpand={onExpand}
              />
              <FolderTitle
                active={pathname === `${Path.DotoriPage}/${item.id}`}
                onClick={() => navigate(`${Path.DotoriPage}/${item.id}`)}
              >
                {item.data.name}
              </FolderTitle>
            </FolderLeftBox>

            <FolderRightBox
              className="right"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <FolderETCButton onClick={() => onCreateFolder(item.id)}>
                <PlusIcon />
              </FolderETCButton>

              <FolderETCButton
                onClick={(e) => {
                  onToggleFolderMenu(e);
                  onChangeSelectedFolderId(item.id);
                }}
              >
                <More16Icon />
              </FolderETCButton>
            </FolderRightBox>
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

      {isFolderMenu && (
        <FolderMenu
          position={folderMenuPosition}
          onToggleModal={onToggleModal}
        />
      )}

      {isRenameModal && (
        <FolderRenameModal
          position={folderMenuPosition}
          onToggleModal={onToggleRenameModal}
          isSelectedFolderId={isSelectedFolderId}
        />
      )}

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="이 폴더를 삭제할까요?"
          content="폴더에 있는 모든 내용들이 <br /> 휴지통으로 들어가요!"
          buttonName="삭제"
          onClick={() => mutateDeleteFolder()}
        />
      )}
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
    .right {
      display: flex;
    }
  }
`;

const FolderLeftBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 65px;
`;

const FolderTitle = styled.span<{ active: boolean }>`
  cursor: pointer;
  color: ${({ active }) => (active ? palette.primary : palette.black)};
  margin-left: 4px;
  height: 28px;
  line-height: 28px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;

const FolderRightBox = styled.div`
  display: none;
  align-items: center;
`;

const FolderETCButton = styled.button`
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    margin-right: 8px;
  }
`;

export default FolderList;
