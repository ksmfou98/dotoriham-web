import Tree, {
  ItemId,
  mutateTree,
  RenderItemParams,
  TreeData,
} from "@atlaskit/tree";
import FolderItemIcon from "modules/sidebar/FolderItemIcon";
import useFolderListQuery from "modules/sidebar/hooks/useFolderListQuery";
import { palette } from "lib/styles/palette";
import { scrollbar } from "lib/styles/utilStyles";
import React, { useEffect, useState } from "react";
import { initialFolderState } from "stores/folder";
import styled, { css } from "styled-components";
import Button from "../../components/Button/Button";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import PagePath from "../pagePath/PagePath";
import { DotoriPathTypes } from "types/dotori";

interface FolderListModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  onMove: (nextFolderId: ItemId) => void;
  path: DotoriPathTypes;
}

function FolderListModal({
  isModal,
  onToggleModal,
  onMove,
  path,
}: FolderListModalProps) {
  const [folders, setFolders] = useState<TreeData>(initialFolderState);
  const [selectedFolderId, setSelectedFolderId] = useState<ItemId | null>();
  const { data } = useFolderListQuery("modal");

  const onSelectFolderId = (folderId: ItemId) => {
    setSelectedFolderId(folderId);
  };

  useEffect(() => {
    if (!data) return;
    setFolders(data);
  }, [data]);

  const onExpandFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: true }));
  };

  const onCollapseFolder = (itemId: ItemId) => {
    setFolders(mutateTree(folders, itemId, { isExpanded: false }));
  };

  const renderFolderItem = ({
    item,
    onExpand,
    onCollapse,
    provided,
  }: RenderItemParams) => {
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
            <FolderItemLeftBox>
              <FolderItemIcon
                item={item}
                onCollapse={onCollapse}
                onExpand={onExpand}
              />
              <FolderTitle
                active={selectedFolderId === item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFolderId(item.id);
                }}
              >
                {item.data.name}
              </FolderTitle>
            </FolderItemLeftBox>
          </FolderItemBlock>
        </FolderItemWrapper>
      </>
    );
  };

  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width={456}
      height={440}
    >
      <ModalInner>
        <ModalTitle>위치 선택</ModalTitle>
        <PathBox>
          <PagePath
            isModal
            path={selectedFolderId ? "folder" : "main"}
            folderId={selectedFolderId as string}
          />
        </PathBox>
        <FolderListBox>
          <FolderListBlock>
            <Tree
              tree={folders}
              renderItem={renderFolderItem}
              onExpand={onExpandFolder}
              onCollapse={onCollapseFolder}
              offsetPerLevel={16} // 한 깊이당 padding 값
              isNestingEnabled
            />
          </FolderListBlock>
        </FolderListBox>
        <ButtonGroup>
          <CancelButton
            variant="tertiary"
            width="63px"
            height="26px"
            onClick={onToggleModal}
          >
            취소
          </CancelButton>
          <MoveButton
            variant="primary"
            width="63px"
            height="26px"
            disabled={!selectedFolderId}
            onClick={() => {
              onMove(selectedFolderId!);
              onToggleModal();
            }}
          >
            확인
          </MoveButton>
        </ButtonGroup>
      </ModalInner>
    </ModalTemplate>
  );
}

const ModalInner = styled.div`
  padding: 16px 28px 22px 20px;
`;

const ModalTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.grayDarkest};
  line-height: 1.5;
  margin-bottom: 8px;
`;

const PathBox = styled.div`
  height: 16px;
`;

const FolderListBox = styled.div`
  width: 408px;
  height: 303px;
  overflow-y: scroll;
  border: 0.031rem solid ${palette.gray};
  border-radius: 6px;
  padding: 9.5px 0 0 10px;
  margin-top: 8px;
  margin-bottom: 18px;
  ${scrollbar}
`;

const FolderListBlock = styled.div`
  position: relative;
`;

const FolderItemWrapper = styled.div`
  width: 166px;
`;

const FolderItemRigthBox = styled.div`
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
    ${FolderItemRigthBox} {
      display: flex;
    }
  }
`;

const FolderItemLeftBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 65px;
`;

const FolderTitle = styled.span<{ active: boolean }>`
  cursor: pointer;
  height: 28px;
  line-height: 25px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
  ${(props) =>
    props.active &&
    css`
      font-weight: 500;
      color: ${palette.primary};
    `}
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const CancelButton = styled(Button)`
  margin-right: 12px;
  font-size: 12px;
`;

const MoveButton = styled(Button)`
  font-weight: 400;
  font-size: 12px;
`;

export default FolderListModal;
