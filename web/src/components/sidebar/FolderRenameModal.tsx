import { X16Icon } from "assets/icons";
import Button from "components/common/Button";
import Input from "components/common/Input";
import { palette } from "lib/styles/palette";
import React from "react";
import { Emoji } from "react-twemoji-picker";
import styled from "styled-components";
import { IFolderMenuPosition } from "./FolderList";

interface FolderRenameModalProps {
  position: IFolderMenuPosition;
  onToggleModal: () => void;
}

function FolderRenameModal({
  onToggleModal,
  position,
}: FolderRenameModalProps) {
  const { left, top } = position;

  return (
    <FolderRenameModalBlock onClick={onToggleModal}>
      <RenameModalInner
        top={top}
        left={left}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButtonBox>
          <X16Icon onClick={onToggleModal} />
        </CloseButtonBox>

        <RenameForm>
          <EmojiBox></EmojiBox>

          <FolderNameInput type="text" width="192px" height="28px" />

          <Button
            variant="primary"
            width="72px"
            height="28px"
            className="renameBtn"
          >
            변경
          </Button>
        </RenameForm>
      </RenameModalInner>
    </FolderRenameModalBlock>
  );
}

const FolderRenameModalBlock = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100%;
  height: 100%;
  .emoji-picker {
    .emoji-picker-scroll .emoji-picker-category-title {
      font-size: 12px;
    }
    .emoji-picker-emoji {
      height: 25px;
    }
  }
`;

const RenameModalInner = styled.div<IFolderMenuPosition>`
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: ${palette.white};
  position: fixed;
  z-index: 9999;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left + 20}px;
  height: 66px;
  width: 316px;
  padding: 4px 8px;
`;

const CloseButtonBox = styled.div`
  overflow: hidden;
  margin-bottom: 3px;
  svg {
    float: right;
    cursor: pointer;
  }
`;

const RenameForm = styled.div`
  display: flex;
  align-items: center;
  .renameBtn {
    font-size: 12px;
    font-weight: 700;
  }
`;

const EmojiBox = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${palette.grayLight};
  cursor: pointer;
  margin-right: 4px;
`;

const EmojiIcon = styled(Emoji)``;

const FolderNameInput = styled(Input)`
  font-size: 12px;
  line-height: 1.42;
  color: ${palette.grayDarkest};
  margin-right: 4px;
`;

export default FolderRenameModal;
