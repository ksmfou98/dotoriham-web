import { ItemId } from "@atlaskit/tree";
import { SmallModal } from "components";
import { useToggle } from "domains/@shared/hooks";
import DotoriBlankSlate from "domains/dotori/components/DotoriBlankSlate";
import DotoriEditModal from "domains/dotori/components/DotoriEditModal";
import { ActiveDotoriMenu } from "domains/dotori/components/DotoriList";
import useDotoriMutation from "domains/dotori/hooks/useDotoriMutation";
import { initialDotoriState } from "domains/dotori/utils/constants";
import { DotoriUiModel } from "domains/search/models/dotori.model";
import FolderListModal from "domains/sidebar/FolderListModal";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { SearchDotoriListItem } from "../SearchDotoriListItem";

interface Props {
  dotoriList: DotoriUiModel[];
  onToggleDotoriChecked: (dotoriId: string) => void;
}

function SearchDotoriList({ dotoriList, onToggleDotoriChecked }: Props) {
  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isEditModal, onToggleEditModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();
  const { mutateDeleteDotori, mutateMoveDotori } = useDotoriMutation();

  const [isActiveDotoriMenu, setIsActiveDotoriMenu] =
    useState<ActiveDotoriMenu>({
      ...initialDotoriState,
      isOpen: false,
    });

  const onActiveDotoriMenu = useCallback(
    (dotori: DotoriUiModel, isOpen: boolean) => {
      setIsActiveDotoriMenu({ ...dotori, isOpen });
    },
    []
  );

  const onDeleteDotori = () => mutateDeleteDotori([isActiveDotoriMenu.id]);

  const onMoveDotori = (nextFolderId: ItemId) => {
    const requestData = {
      bookmarkIdList: [isActiveDotoriMenu.id],
      nextFolderId,
    };
    mutateMoveDotori(requestData);
  };

  return (
    <DotoriListBlock>
      {dotoriList.length === 0 && <DotoriBlankSlate path="search" />}

      {dotoriList.map((dotori) => (
        <SearchDotoriListItem
          key={dotori.id}
          dotori={dotori}
          isActiveDotoriMenu={
            isActiveDotoriMenu.id === dotori.id && isActiveDotoriMenu.isOpen
          }
          onActiveDotoriMenu={onActiveDotoriMenu}
          onToggleDeleteModal={onToggleDeleteModal}
          onToggleEditModal={onToggleEditModal}
          onToggleMoveModal={onToggleMoveModal}
          onToggleDotoriChecked={onToggleDotoriChecked}
        />
      ))}

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
          content="삭제된 도토리는 모두 <br /> 휴지통으로 들어가요!"
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
    </DotoriListBlock>
  );
}

const DotoriListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 0 24px 40px 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

export default SearchDotoriList;
