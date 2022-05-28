import ModalTemplate from "components/common/ModalTemplate";
import { ModalTitle } from "components/common/ModalTitle";
import React from "react";
import styled from "styled-components";

interface Props {
  isModal: boolean;
  onToggleModal: () => void;
}

function DotoriAddModal({ isModal, onToggleModal }: Props) {
  return (
    <ModalTemplate
      width={423}
      height={307}
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <Inner>
        <ModalTitle mb={20}>도토리 추가</ModalTitle>
      </Inner>
    </ModalTemplate>
  );
}

const Inner = styled.div`
  padding: 26px 24px 24px 24px;
`;

export default DotoriAddModal;
