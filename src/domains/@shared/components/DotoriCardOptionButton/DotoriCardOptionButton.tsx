import { ItemId } from "@atlaskit/tree";
import {
  BellSelectedIcon,
  BellUnSelectedIcon,
  Copy24Icon,
  More24Icon,
} from "assets/icons";
import { SmallModal } from "components";
import { useCopyUrl, useOutSideClick, useToggle } from "domains/@shared/hooks";
import DotoriEditModal from "domains/dotori/components/DotoriEditModal";
import { ActiveDotoriMenu } from "domains/dotori/components/DotoriList";
import FolderListModal from "domains/@global/sidebar/FolderListModal";
import { palette } from "lib/styles";
import styled from "styled-components";

interface OptionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleDeleteModal: () => void;
  onToggleEditModal: () => void;
  onToggleMoveModal: () => void;
}

function OptionMenu({
  isOpen,
  onClose,
  onToggleDeleteModal,
  onToggleEditModal,
  onToggleMoveModal,
}: OptionMenuProps) {
  const { targetEl } = useOutSideClick(isOpen, onClose);

  const dotoriMenus = [
    { name: "이동", onClick: onToggleMoveModal },
    { name: "편집", onClick: onToggleEditModal },
    { name: "삭제", onClick: onToggleDeleteModal },
  ];

  return (
    <DotoriItemMenuBlock ref={targetEl}>
      <DotoriMenuInner>
        {dotoriMenus.map(({ name, onClick }) => (
          <MenuItem
            key={name}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
              onClick();
            }}
          >
            {name}
          </MenuItem>
        ))}
      </DotoriMenuInner>
    </DotoriItemMenuBlock>
  );
}

interface Props {
  isRemind: boolean;
  onRemindToggle: () => void;
  link: string;
  isActiveDotoriMenu: ActiveDotoriMenu;
  onActiveDotoriMenu: (isOpen: boolean) => void;
  isOpenDotoriMenu: boolean;
  onDeleteDotori: () => void;
  onMoveDotori: (nextFolderId: ItemId) => void;
}

export function DotoriCardOptionButton({
  isActiveDotoriMenu,
  isOpenDotoriMenu,
  isRemind,
  link,
  onActiveDotoriMenu,
  onDeleteDotori,
  onMoveDotori,
  onRemindToggle,
}: Props) {
  const { onCopyUrl } = useCopyUrl();
  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isEditModal, onToggleEditModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();

  return (
    <>
      <DotoriOption>
        <OptionButton onClick={onRemindToggle}>
          {isRemind ? <BellSelectedIcon /> : <BellUnSelectedIcon />}
        </OptionButton>

        <OptionButton onClick={() => onCopyUrl(link)}>
          <Copy24Icon />
        </OptionButton>

        <OptionButton
          onClick={(e) => {
            e.stopPropagation();
            onActiveDotoriMenu(true);
          }}
        >
          <More24Icon />
          {isOpenDotoriMenu && (
            <OptionMenu
              isOpen={isOpenDotoriMenu}
              onClose={() => onActiveDotoriMenu(false)}
              onToggleDeleteModal={onToggleDeleteModal}
              onToggleEditModal={onToggleEditModal}
              onToggleMoveModal={onToggleMoveModal}
            />
          )}
        </OptionButton>
      </DotoriOption>

      {isEditModal && (
        <DotoriEditModal
          isOpen={isEditModal}
          isActiveDotoriMenu={isActiveDotoriMenu}
          onToggleModal={onToggleEditModal}
        />
      )}

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="선택한 도토리를 삭제할까요?"
          content="휴지통의 도토리는 <br /> 30일 뒤 완전히 사라져요!"
          buttonName="삭제"
          onClick={onDeleteDotori}
        />
      )}

      {isMoveModal && (
        <FolderListModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
          onMove={onMoveDotori}
        />
      )}
    </>
  );
}

const DotoriItemMenuBlock = styled.div`
  position: absolute;
  top: 0px;
  left: 24px;
  z-index: 1002;
`;

const DotoriMenuInner = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: ${palette.white};
  z-index: 9999;
`;

const MenuItem = styled.div`
  width: 62px;
  height: 29px;
  font-size: 10px;
  padding: 7px 2px 9px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${palette.grayLightest};
  }
`;

const DotoriOption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90px;
`;

const OptionButton = styled.button`
  position: relative;
`;
