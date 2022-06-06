import { PlusCircleIcon } from "assets/icons";
import { Button } from "components/common";
import ModalTemplate from "components/common/ModalTemplate";
import { ModalTitle } from "components/common/ModalTitle";
import { palette } from "lib/styles/palette";
import React, { useState } from "react";
import styled from "styled-components";
import { DotoriAddRequest } from "types/dotori";
import DotoriAddForm from "./DotoriAddForm";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isModal: boolean;
  onToggleModal: () => void;
}

interface DotoriForm extends DotoriAddRequest {
  id: string;
}

const defaultDotoriAddFormState = {
  id: uuidv4(),
  url: "",
  title: "",
  remind: false,
  folderId: 0,
  description: "",
  image: "",
};

function DotoriAddModal({ isModal, onToggleModal }: Props) {
  const [dotoriFormList, setDotoriFormList] = useState<DotoriForm[]>([
    defaultDotoriAddFormState,
  ]);

  const onAddFormList = () => {
    setDotoriFormList([
      ...dotoriFormList,
      { ...defaultDotoriAddFormState, id: uuidv4() },
    ]);
  };

  return (
    <Container
      width={424}
      height={354}
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <Inner>
        <ModalTitle mb={28}>도토리 추가</ModalTitle>
        {dotoriFormList.map((dotoriForm) => (
          <DotoriAddForm key={dotoriForm.id} />
        ))}

        <AddButton onClick={onAddFormList}>
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
  max-height: 800px;
  overflow-y: scroll;
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
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
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
