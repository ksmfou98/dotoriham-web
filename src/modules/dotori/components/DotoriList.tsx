import { ItemId } from "@atlaskit/tree";
import FolderListModal from "modules/sidebar/FolderListModal";
import SmallModal from "components/Modal/SmallModal";
import useToggle from "modules/@shared/hooks/useToggle";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { dotoriSelector } from "stores/dotori";
import styled from "styled-components";
import { DotoriPathTypes, IDotoriItem } from "types/dotori";
import { initialDotoriState } from "../utils/constants";
import DotoriAddButton from "./DotoriAddButton";
import DotoriAddModal from "./DotoriAddModal";
import DotoriBlankSlate from "./DotoriBlankSlate";
import DotoriEditModal from "./DotoriEditModal";
import useDotoriMutation from "../hooks/useDotoriMutation";
import { media } from "lib/styles";
import { DotoriCard } from "modules/@shared/components";
import {
  BellSelectedIcon,
  BellUnSelectedIcon,
  Copy24Icon,
  More24Icon,
} from "assets/icons";
import DotoriItemMenu from "./DotoriItemMenu";
import { useCopyUrl, useToast } from "modules/@shared/hooks";
import { userSelector } from "stores/user";
import useDotoriSelect from "../hooks/useDotoriSelect";

export interface ActiveDotoriMenu extends IDotoriItem {
  isOpen: boolean;
}

function DotoriList({ path }: { path: DotoriPathTypes }) {
  const dotoris = useSelector(dotoriSelector);

  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isEditModal, onToggleEditModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();
  const [isAddModal, onToggleAddModal] = useToggle();
  const {
    mutateDeleteDotori,
    mutateMoveDotori,
    mutateRemindToggleDotori,
    mutateClickCountDotori,
  } = useDotoriMutation();
  const { onCopyUrl } = useCopyUrl();
  const { remindRecommendationToast } = useToast();
  const { remindToggle } = useSelector(userSelector);
  const { isActiveSelectBox, onToggleDotoriChecked } = useDotoriSelect();

  const [isActiveDotoriMenu, setIsActiveDotoriMenu] =
    useState<ActiveDotoriMenu>({
      ...initialDotoriState,
      isOpen: false,
    });

  const onActiveDotoriMenu = useCallback(
    (dotori: IDotoriItem, isOpen: boolean) => {
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

  const onRemindToggle = (id: string, remindTime: string | null) => {
    if (!remindToggle) {
      remindRecommendationToast();
      return;
    }

    const requestData = {
      dotoriId: id,
      remind: !!remindTime,
    };

    mutateRemindToggleDotori(requestData);
  };

  /**
   * true: main 페이지 or folder 페이지
   * false: trash 페이지 or search 페이지
   */
  const isDotoriPage = useMemo(
    () => path === "folder" || path === "main",
    [path]
  );

  return (
    <DotoriListBlock>
      {!isDotoriPage && dotoris.length === 0 && (
        <DotoriBlankSlate path={path} />
      )}

      {isDotoriPage && <DotoriAddButton onClick={onToggleAddModal} />}

      {dotoris.map((dotori) => {
        const { title, description, link, image, remindTime, id, checked } =
          dotori;
        return (
          <DotoriCard
            key={id}
            title={title}
            description={description}
            link={link}
            imageSrc={image}
            checked={checked}
            onToggleChecked={() => onToggleDotoriChecked(id)}
            isActiveSelectBox={isActiveSelectBox}
            onClickLink={() => mutateClickCountDotori(id)}
            bottomMenu={
              <DotoriOption>
                <OptionButton onClick={() => onRemindToggle(id, remindTime)}>
                  {remindTime ? <BellSelectedIcon /> : <BellUnSelectedIcon />}
                </OptionButton>

                <OptionButton onClick={() => onCopyUrl(link)}>
                  <Copy24Icon />
                </OptionButton>

                <OptionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onActiveDotoriMenu(dotori, true);
                  }}
                >
                  <More24Icon />
                  {isActiveDotoriMenu.id === dotori.id &&
                    isActiveDotoriMenu.isOpen && (
                      <DotoriItemMenu
                        isOpen={
                          isActiveDotoriMenu.id === dotori.id &&
                          isActiveDotoriMenu.isOpen
                        }
                        onClose={() => onActiveDotoriMenu(dotori, false)}
                        onToggleDeleteModal={onToggleDeleteModal}
                        onToggleEditModal={onToggleEditModal}
                        onToggleMoveModal={onToggleMoveModal}
                      />
                    )}
                </OptionButton>
              </DotoriOption>
            }
          />
        );
      })}

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
          path={path}
        />
      )}

      {isAddModal && (
        <DotoriAddModal isModal={isAddModal} onToggleModal={onToggleAddModal} />
      )}
    </DotoriListBlock>
  );
}

const DotoriListBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  gap: 24px;
  row-gap: 28px;

  ${media.large} {
    grid-template-columns: repeat(2, 1fr);
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

export default memo(DotoriList);
