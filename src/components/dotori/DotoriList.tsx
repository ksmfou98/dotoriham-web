import FolderListModal from "components/common/FolderListModal";
import SmallModal from "components/common/SmallModal";
import useToggle from "hooks/useToggle";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dotoriSelector } from "stores/dotori";
import styled from "styled-components";
import { DotoriPathTypes } from "types/dotori";
import DotoriBlankSlate from "./DotoriBlankSlate";
import DotoriEditModal from "./DotoriEditModal";
import DotoriListItem from "./DotoriListItem";

export interface ToggleModal {
  onToggleDeleteModal: () => void;
  onToggleEditModal: () => void;
  onToggleMoveModal: () => void;
}

function DotoriList({ path }: { path: DotoriPathTypes }) {
  const dotoris = useSelector(dotoriSelector);

  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isEditModal, onToggleEditModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();

  const onToggleModal = {
    onToggleDeleteModal,
    onToggleEditModal,
    onToggleMoveModal,
  };

  const [isActiveDotoriMenuId, setIsActiveDotoriMenuId] = useState<string>("");
  const onActiveDotoriMenu = (dotoriId: string) => {
    setIsActiveDotoriMenuId(dotoriId);
  };

  return (
    <DotoriListBlock>
      {dotoris.length === 0 && <DotoriBlankSlate path={path} />}

      {dotoris.map((dotori) => (
        <DotoriListItem
          key={dotori.id}
          dotori={dotori}
          isActiveDotoriMenuId={isActiveDotoriMenuId}
          onActiveDotoriMenu={onActiveDotoriMenu}
          onToggleModal={onToggleModal}
        />
      ))}

      {isEditModal && (
        <DotoriEditModal
          isOpen={isEditModal}
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
          onClick={() => console.log("삭제")}
        />
      )}

      {isMoveModal && (
        <FolderListModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
          onMove={() => console.log("옮기기")}
          path={path}
        />
      )}
    </DotoriListBlock>
  );
}

const DotoriListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default DotoriList;
