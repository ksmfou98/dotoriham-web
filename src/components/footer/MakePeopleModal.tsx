import ModalTemplate from "components/common/ModalTemplate";
import React from "react";

interface Props {
  isModal: boolean;
  onToggleModal: () => void;
}

function MakePeopleModal({ isModal, onToggleModal }: Props) {
  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width={714}
      height={471}
    >
      MakePeopleModal
    </ModalTemplate>
  );
}

export default MakePeopleModal;
