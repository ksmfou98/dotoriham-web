import { PlusCircleIcon, X16BigIcon } from "assets/icons";
import { Button } from "components";
import ModalTemplate from "components/Modal/ModalTemplate";
import { ModalTitle } from "components/Modal/ModalTitle";
import { palette } from "lib/styles/palette";
import React, { Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import { DotoriForm } from "types/dotori";
import DotoriAddForm from "./DotoriAddForm";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { addDotoriAPI } from "domains/dotori/apis/dotori";
import DividerLine from "components/DividerLine/DividerLine";
import { useQueryClient } from "react-query";
import { QueryKey } from "lib/queryKey";

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
  const queryClient = useQueryClient();
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

    try {
      await addDotoriAPI({ folderId, addBookmarkList });
      queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
      onToggleModal();
    } catch (e) {
      console.log(e);
    }
  }, [dotoriFormList, folderId, onToggleModal, queryClient]);

  const onChangeForm = useCallback(
    (form: DotoriForm) => {
      setDotoriFormList(
        dotoriFormList.map((item) => (item.id === form.id ? form : item))
      );
    },
    [dotoriFormList]
  );

  const onCloseAddForm = useCallback((id: string) => {
    setDotoriFormList((prevForm) => prevForm.filter((item) => item.id !== id));
  }, []);

  return (
    <Container
      width={424}
      height={354}
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <Inner>
        <ModalTitle mb={28}>도토리 추가</ModalTitle>
        {dotoriFormList.map((dotoriForm, index) => (
          <Fragment key={dotoriForm.id}>
            {index !== 0 && (
              <CloseButtonBox>
                <X16BigIcon onClick={() => onCloseAddForm(dotoriForm.id)} />
              </CloseButtonBox>
            )}
            <DotoriAddForm
              dotoriForm={dotoriForm}
              onChangeForm={onChangeForm}
            />
            {index !== dotoriFormList.length - 1 && (
              <DividerLine width="100%" color={palette.grayLightest} mb={16} />
            )}
          </Fragment>
        ))}

        {dotoriFormList.length < 3 && (
          <AddButton onClick={onAddFormList}>
            <PlusCircleIcon />
            추가
          </AddButton>
        )}

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
  max-height: 80%;
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

const CloseButtonBox = styled.div`
  margin-bottom: 19px;
  overflow: hidden;
  svg {
    float: right;
    cursor: pointer;
  }
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
