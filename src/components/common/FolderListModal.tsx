import { palette } from "lib/styles/palette";
import { scrollbar } from "lib/styles/utilStyles";
import React from "react";
import styled from "styled-components";
import Button from "./Button";
import ModalTemplate from "./ModalTemplate";
import PagePath from "./PagePath";

interface FolderListModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  onMove: () => void;
}

function FolderListModal({
  isModal,
  onToggleModal,
  onMove,
}: FolderListModalProps) {
  return (
    <ModalTemplate
      isModal={isModal}
      onToggleModal={onToggleModal}
      width={456}
      height={440}
    >
      <ModalInner>
        <ModalTitle>위치 선택</ModalTitle>
        <PathBox>
          <PagePath isModal />
        </PathBox>
        <FolderListBox></FolderListBox>
        <ButtonGroup>
          <CancelButton
            variant="tertiary"
            width="63px"
            height="26px"
            onClick={onToggleModal}
          >
            취소
          </CancelButton>
          <MoveButton
            variant="primary"
            width="63px"
            height="26px"
            onClick={() => {
              onMove();
              onToggleModal();
            }}
          >
            확인
          </MoveButton>
        </ButtonGroup>
      </ModalInner>
    </ModalTemplate>
  );
}

const ModalInner = styled.div`
  padding: 16px 28px 22px 20px;
`;

const ModalTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.grayDarkest};
  line-height: 1.5;
  margin-bottom: 8px;
`;

const PathBox = styled.div`
  height: 16px;
`;

const FolderListBox = styled.div`
  width: 408px;
  height: 303px;
  overflow-y: scroll;
  border: 0.031rem solid ${palette.gray};
  border-radius: 6px;
  padding: 9.5px 0 0 10px;
  margin-top: 8px;
  margin-bottom: 18px;
  ${scrollbar}
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const CancelButton = styled(Button)`
  margin-right: 12px;
`;

const MoveButton = styled(Button)`
  font-weight: 400;
`;

export default FolderListModal;
