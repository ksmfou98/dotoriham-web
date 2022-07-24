import { ItemId } from "@atlaskit/tree";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { dotoriSelector } from "stores/dotori";
import styled from "styled-components";
import { DotoriPathTypes, IDotoriItem } from "types/dotori";
import { initialDotoriState } from "../utils/constants";
import DotoriAddButton from "./DotoriAddButton";
import DotoriAddModal from "./DotoriAddModal";
import DotoriBlankSlate from "./DotoriBlankSlate";
import useDotoriMutation from "../hooks/useDotoriMutation";
import { media } from "lib/styles";
import { DotoriCard, DotoriCardOptionButton } from "domains/@shared/components";
import { useToast, useToggle } from "domains/@shared/hooks";
import { userSelector } from "stores/user";
import useDotoriSelect from "../hooks/useDotoriSelect";

export interface ActiveDotoriMenu extends IDotoriItem {
  isOpen: boolean;
}

function DotoriList({ path }: { path: DotoriPathTypes }) {
  const dotoris = useSelector(dotoriSelector);

  const [isAddModal, onToggleAddModal] = useToggle();
  const {
    mutateDeleteDotori,
    mutateMoveDotori,
    mutateRemindToggleDotori,
    mutateClickCountDotori,
  } = useDotoriMutation();
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
            isActiveSelectButton={isActiveSelectBox}
            onClickLink={() => mutateClickCountDotori(id)}
            optionButton={
              <DotoriCardOptionButton
                isActiveDotoriMenu={isActiveDotoriMenu}
                isOpenDotoriMenu={
                  isActiveDotoriMenu.id === dotori.id &&
                  isActiveDotoriMenu.isOpen
                }
                isRemind={!!remindTime}
                link={link}
                onActiveDotoriMenu={(isOpen: boolean) =>
                  onActiveDotoriMenu(dotori, isOpen)
                }
                onDeleteDotori={onDeleteDotori}
                onMoveDotori={onMoveDotori}
                onRemindToggle={() => onRemindToggle(id, remindTime)}
              />
            }
          />
        );
      })}

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

export default memo(DotoriList);
