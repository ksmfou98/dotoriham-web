import { ItemId } from "@atlaskit/tree";
import FolderListModal from "components/common/FolderListModal";
import SmallModal from "components/common/SmallModal";
import useToggle from "hooks/useToggle";
import React, { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { dotoriSelector } from "stores/dotori";
import styled from "styled-components";
import { DotoriPathTypes, IDotoriItem } from "types/dotori";
import { initialDotoriState } from "./constants";
import DotoriAddButton from "./DotoriAddButton";
import DotoriAddModal from "./DotoriAddModal";
import DotoriBlankSlate from "./DotoriBlankSlate";
import DotoriEditModal from "./DotoriEditModal";
import DotoriListItem from "./DotoriListItem";
import useDotoriMutation from "./hooks/useDotoriMutation";

export interface ActiveDotoriMenu extends IDotoriItem {
  isOpen: boolean;
}

function DotoriList({ path }: { path: DotoriPathTypes }) {
  const dotoris = useSelector(dotoriSelector);

  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isEditModal, onToggleEditModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();
  const [isAddModal, onToggleAddModal] = useToggle();
  const { mutateDeleteDotori, mutateMoveDotori } = useDotoriMutation();

  const [isActiveDotoriMenu, setIsActiveDotoriMenu] =
    useState<ActiveDotoriMenu>({
      ...initialDotoriState,
      isOpen: false,
    });

  const onActiveDotoriMenu = useCallback(
    (dotori: IDotoriItem, isOpen: boolean) => {
      setIsActiveDotoriMenu({ ...dotori, isOpen });
    },
    []
  );

  const onDeleteDotori = () => mutateDeleteDotori([isActiveDotoriMenu.id]);

  const onMoveDotori = (nextFolderId: ItemId) => {
    const requestData = {
      bookmarkIdList: [isActiveDotoriMenu.id],
      nextFolderId,
    };
    mutateMoveDotori(requestData);
  };

  return (
    <DotoriListBlock>
      {dotoris.length === 0 && <DotoriBlankSlate path={path} />}

      <DotoriAddButton onClick={onToggleAddModal} />

      {dotoris.map((dotori) => (
        <DotoriListItem
          key={dotori.id}
          dotori={dotori}
          isActiveDotoriMenu={
            isActiveDotoriMenu.id === dotori.id && isActiveDotoriMenu.isOpen
          }
          onActiveDotoriMenu={onActiveDotoriMenu}
          onToggleDeleteModal={onToggleDeleteModal}
          onToggleEditModal={onToggleEditModal}
          onToggleMoveModal={onToggleMoveModal}
        />
      ))}

      {isEditModal && (
        <DotoriEditModal
          isOpen={isEditModal}
          isActiveDotoriMenu={isActiveDotoriMenu}
          onToggleModal={onToggleEditModal}
        />
      )}

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="선택한 도토리를 삭제할까요?"
          content="삭제된 도토리는 모두 <br /> 휴지통으로 들어가요!"
          buttonName="삭제"
          onClick={onDeleteDotori}
        />
      )}

      {isMoveModal && (
        <FolderListModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
          onMove={onMoveDotori}
          path={path}
        />
      )}

      {isAddModal && (
        <DotoriAddModal isModal={isAddModal} onToggleModal={onToggleAddModal} />
      )}
    </DotoriListBlock>
  );
}

const DotoriListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 0 24px 40px 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

export default memo(DotoriList);
