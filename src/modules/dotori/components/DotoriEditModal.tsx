import React, { useState } from "react";
import ModalTemplate from "components/Modal/ModalTemplate";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import Button from "components/Button/Button";
import { palette } from "lib/styles/palette";
import { ActiveDotoriMenu } from "./DotoriList";
import useDotoriMutation from "../hooks/useDotoriMutation";
import { ModalTitle } from "components/Modal/ModalTitle";

interface DotoriEditModalProps {
  isOpen: boolean;
  onToggleModal: () => void;
  isActiveDotoriMenu: ActiveDotoriMenu;
}

const TITLE_MAX_LENGTH = 37;
const DESCRIPTION_MAX_LENGTH = 63;

function DotoriEditModal({
  isOpen,
  onToggleModal,
  isActiveDotoriMenu,
}: DotoriEditModalProps) {
  const [title, setTitle] = useState(
    isActiveDotoriMenu.title.length >= TITLE_MAX_LENGTH
      ? isActiveDotoriMenu.title.substring(0, TITLE_MAX_LENGTH)
      : isActiveDotoriMenu.title
  );
  const [description, setDescription] = useState(
    isActiveDotoriMenu.description.length >= DESCRIPTION_MAX_LENGTH
      ? isActiveDotoriMenu.description.slice(0, DESCRIPTION_MAX_LENGTH)
      : isActiveDotoriMenu.description
  );

  const { mutateEditDotori } = useDotoriMutation();

  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > TITLE_MAX_LENGTH) return;
    setTitle(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > DESCRIPTION_MAX_LENGTH) return;
    setDescription(e.target.value);
  };

  const onSubmitTitle = () => {
    const requestData = {
      dotoriId: isActiveDotoriMenu.id,
      title,
      description,
    };
    mutateEditDotori(requestData);
    onToggleModal();
  };

  return (
    <EditModalTemplate
      width={468}
      height={300}
      isModal={isOpen}
      onToggleModal={onToggleModal}
    >
      <ModalStyled>
        <ModalTitle mb={14}>도토리 편집</ModalTitle>
        <ModalContent>
          <InputInfo>
            <InputText>제목</InputText>
            <InputCount active={title.length >= TITLE_MAX_LENGTH}>
              {title.length}/{TITLE_MAX_LENGTH}
            </InputCount>
          </InputInfo>
          <EditInput value={title} onChange={onChangeTitle} />
        </ModalContent>

        <ModalContent>
          <InputInfo>
            <InputText>내용</InputText>
            <InputCount active={description.length >= DESCRIPTION_MAX_LENGTH}>
              {description.length}/{DESCRIPTION_MAX_LENGTH}
            </InputCount>
          </InputInfo>
          <EditInput value={description} onChange={onChangeDescription} />
        </ModalContent>
        <ModalButtonGroup>
          <Button
            variant="tertiary"
            width="206px"
            height="42px"
            borderRadius="8px"
            onClick={onToggleModal}
          >
            취소
          </Button>
          <Button
            variant="primary"
            width="206px"
            height="42px"
            borderRadius="8px"
            onClick={onSubmitTitle}
          >
            편집
          </Button>
        </ModalButtonGroup>
      </ModalStyled>
    </EditModalTemplate>
  );
}

const EditModalTemplate = styled(ModalTemplate)`
  height: auto;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
`;

const ModalStyled = styled.div`
  padding: 26px 24px 24px;
  height: 100%;
`;

const InputInfo = styled.div`
  display: flex;
  font-size: 12px;
  color: ${palette.grayDarkest};
  font-weight: 500;
  font-family: "Roboto";
  margin-bottom: 8px;
`;

const InputText = styled.div`
  margin-right: 6px;
`;

const InputCount = styled.div<{ active: boolean }>`
  color: ${({ active }) => (active ? palette.primary : palette.gray)};
`;

const EditInput = styled(TextareaAutosize)`
  resize: none;
  outline: none;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 20px;
  border: solid 1px ${palette.grayLight};
  padding: 6px 10px;
`;

const ModalContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${palette.grayDark};
  text-align: center;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  button {
    &:first-child {
      margin-right: 8px;
    }
  }
`;

export default DotoriEditModal;
