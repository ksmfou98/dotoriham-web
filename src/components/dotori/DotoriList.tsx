import useToggle from "hooks/useToggle";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dotoriSelector } from "stores/dotori";
import styled from "styled-components";
import DotoriEditModal from "./DotoriEditModal";
import DotoriListItem from "./DotoriListItem";

function DotoriList() {
  const dotoris = useSelector(dotoriSelector);

  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isEditModal, onToggleEditModal] = useToggle(true);
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
      {dotoris.map((dotori) => (
        <DotoriListItem
          key={dotori.id}
          dotori={dotori}
          isActiveDotoriMenuId={isActiveDotoriMenuId}
          onActiveDotoriMenu={onActiveDotoriMenu}
        />
      ))}

      {isEditModal && (
        <DotoriEditModal
          isOpen={isEditModal}
          onToggleModal={onToggleEditModal}
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
