import { ItemId } from "@atlaskit/tree";
import FolderListModal from "modules/sidebar/FolderListModal";
import SmallModal from "components/Modal/SmallModal";
import useToggle from "modules/@shared/hooks/useToggle";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { dotoriSelector } from "stores/dotori";
import styled from "styled-components";
import { DotoriPathTypes, IDotoriItem } from "types/dotori";
import { initialDotoriState } from "../utils/constants";
import DotoriAddButton from "./DotoriAddButton";
import DotoriAddModal from "./DotoriAddModal";
import DotoriBlankSlate from "./DotoriBlankSlate";
import DotoriEditModal from "./DotoriEditModal";
import DotoriListItem from "./DotoriListItem";
import useDotoriMutation from "../hooks/useDotoriMutation";
import { media } from "lib/styles";

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

  /**
   * true: main 페이지 or folder 페이지
   * false: trash 페이지 or search 페이지
   */
  const isDotoriPage = useMemo(
    () => path === "folder" || path === "main",
    [path]
  );

  return (
    <DotoriListBlock>
      {!isDotoriPage && dotoris.length === 0 && (
        <DotoriBlankSlate path={path} />
      )}

      {isDotoriPage && <DotoriAddButton onClick={onToggleAddModal} />}

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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  gap: 24px;
  row-gap: 28px;

  ${media.large} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default memo(DotoriList);
