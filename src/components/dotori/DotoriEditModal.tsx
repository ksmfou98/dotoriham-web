import React, { useState } from "react";
import ModalTemplate from "components/common/ModalTemplate";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import Button from "components/common/Button";
import { palette } from "lib/styles/palette";
import { ActiveDotoriMenu } from "./DotoriList";
import useDotoriMutation from "./hooks/useDotoriMutation";

interface DotoriEditModalProps {
  isOpen: boolean;
  onToggleModal: () => void;
  isActiveDotoriMenu: ActiveDotoriMenu;
}

const TITLE_MAX_LENGTH = 100;

function DotoriEditModal({
  isOpen,
  onToggleModal,
  isActiveDotoriMenu,
}: DotoriEditModalProps) {
  const [title, setTitle] = useState(isActiveDotoriMenu.title);
  const { mutateEditDotori } = useDotoriMutation();

  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > TITLE_MAX_LENGTH) return;
    setTitle(e.target.value);
  };

  const onSubmitTitle = () => {
    const requestData = {
      dotoriId: isActiveDotoriMenu.id,
      title,
      description: isActiveDotoriMenu.description,
    };
    mutateEditDotori(requestData);
    onToggleModal();
  };

  return (
    <EditModalTemplate
      width={486}
      height={300}
      isModal={isOpen}
      onToggleModal={onToggleModal}
    >
      <ModalStyled>
        <ModalTitle>도토리 편집</ModalTitle>
        <ModalContent>
          <InputInfo>
            <InputText>제목</InputText>
            <InputCount active={title.length === TITLE_MAX_LENGTH}>
              {title.length}/{TITLE_MAX_LENGTH}
            </InputCount>
          </InputInfo>
          <EditInput value={title} onChange={onChangeTitle} />
        </ModalContent>
        <ModalButtonGroup>
          <CancelButton
            variant="tertiary"
            width="206px"
            height="42px"
            borderRadius="8px"
            onClick={onToggleModal}
          >
            취소
          </CancelButton>
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

const ModalTitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: ${palette.black};
  height: 23px;
  line-height: normal;
  margin-bottom: 14px;
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
  margin-bottom: 24px;
  resize: none;
  outline: none;
  width: 100%;
  border-radius: 4px;
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
`;

const CancelButton = styled(Button)`
  color: ${palette.grayDark};
  margin-right: 8px;
`;

export default DotoriEditModal;
