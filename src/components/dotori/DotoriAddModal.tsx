import { PlusCircleIcon } from "assets/icons";
import { Button } from "components/common";
import ModalTemplate from "components/common/ModalTemplate";
import { ModalTitle } from "components/common/ModalTitle";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import DotoriAddForm from "./DotoriAddForm";

interface Props {
  isModal: boolean;
  onToggleModal: () => void;
}

function DotoriAddModal({ isModal, onToggleModal }: Props) {
  return (
    <Container
      width={423}
      height={307}
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <Inner>
        <ModalTitle mb={20}>도토리 추가</ModalTitle>
        <DotoriAddForm />
        <AddButton>
          <PlusCircleIcon />
          추가
        </AddButton>

        <ModalButtonGroup>
          <Button
            variant="tertiary"
            width="184px"
            height="42px"
            borderRadius="8px"
          >
            취소
          </Button>
          <Button
            variant="primary"
            width="184px"
            height="42px"
            borderRadius="8px"
          >
            저장
          </Button>
        </ModalButtonGroup>
      </Inner>
    </Container>
  );
}

const Container = styled(ModalTemplate)`
  height: auto;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
`;

const Inner = styled.div`
  padding: 26px 24px 24px 24px;
`;

const AddButton = styled.div`
  border-top: 1px solid ${palette.grayLightest};
  border-bottom: 1px solid ${palette.grayLightest};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.primary};
  padding: 8px 0;
  font-size: 10px;
  font-weight: 500;
  svg {
    margin-right: 4px;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  button {
    &:first-child {
      margin-right: 8px;
    }
  }
`;

export default DotoriAddModal;
