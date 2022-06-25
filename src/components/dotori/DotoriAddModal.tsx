import { PlusCircleIcon } from "assets/icons";
import { Button } from "components/common";
import ModalTemplate from "components/common/ModalTemplate";
import { ModalTitle } from "components/common/ModalTitle";
import { palette } from "lib/styles/palette";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { DotoriForm } from "types/dotori";
import DotoriAddForm from "./DotoriAddForm";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { addDotoriAPI } from "lib/api/dotori";

interface Props {
  isModal: boolean;
  onToggleModal: () => void;
}

const defaultDotoriAddFormState = {
  id: uuidv4(),
  link: "",
  title: "",
  remind: false,
  description: "",
  image: "",
};

function DotoriAddModal({ isModal, onToggleModal }: Props) {
  const { folderId = "" } = useParams<"folderId">();
  const [dotoriFormList, setDotoriFormList] = useState<DotoriForm[]>([
    defaultDotoriAddFormState,
  ]);

  const onAddFormList = () => {
    setDotoriFormList([
      ...dotoriFormList,
      { ...defaultDotoriAddFormState, id: uuidv4() },
    ]);
  };

  const onSaveDotoriFormList = useCallback(async () => {
    const addBookmarkList = dotoriFormList.map(
      ({ title, link, remind, image, description }) => ({
        title,
        link,
        remind,
        image,
        description,
      })
    );

    const res = await addDotoriAPI({ folderId, addBookmarkList });
  }, [dotoriFormList, folderId]);

  const onChangeForm = useCallback(
    (form: DotoriForm) => {
      setDotoriFormList(
        dotoriFormList.map((item) => (item.id === form.id ? form : item))
      );
    },
    [dotoriFormList]
  );

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
          <DotoriAddForm
            key={dotoriForm.id}
            dotoriForm={dotoriForm}
            onChangeForm={onChangeForm}
          />
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
            onClick={onToggleModal}
          >
            취소
          </Button>
          <Button
            variant="primary"
            width="184px"
            height="42px"
            borderRadius="8px"
            onClick={onSaveDotoriFormList}
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
