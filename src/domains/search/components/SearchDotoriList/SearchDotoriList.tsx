import { ItemId } from "@atlaskit/tree";
import { DotoriCard, DotoriCardOptionButton } from "domains/@shared/components";
import { useToast } from "domains/@shared/hooks";
import DotoriBlankSlate from "domains/dotori/components/DotoriBlankSlate";
import { ActiveDotoriMenu } from "domains/dotori/components/DotoriList";
import useDotoriMutation from "domains/dotori/hooks/useDotoriMutation";
import { initialDotoriState } from "domains/dotori/utils/constants";
import { DotoriUiModel } from "domains/search/models/dotori.model";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "stores/user";
import styled from "styled-components";

interface Props {
  dotoriList: DotoriUiModel[];
  onToggleDotoriChecked: (dotoriId: string) => void;
  isActiveSelectButton: boolean;
}

function SearchDotoriList({
  dotoriList,
  onToggleDotoriChecked,
  isActiveSelectButton,
}: Props) {
  const {
    mutateDeleteDotori,
    mutateMoveDotori,
    mutateClickCountDotori,
    mutateRemindToggleDotori,
  } = useDotoriMutation();
  const { remindToggle, name, image: profileImage } = useSelector(userSelector);
  const { remindRecommendationToast } = useToast();

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

  return (
    <Container>
      {dotoriList.length === 0 && <DotoriBlankSlate path="search" />}

      {dotoriList.map((dotori) => {
        const { title, description, link, image, remindTime, id, checked } =
          dotori;

        return (
          <DotoriCard
            key={id}
            title={title}
            description={description}
            link={link}
            imageSrc={image}
            profileName={name}
            profileImageSrc={profileImage}
            checked={checked}
            onToggleChecked={() => onToggleDotoriChecked(id)}
            isActiveSelectButton={isActiveSelectButton}
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
    </Container>
  );
}

const Container = styled.div`
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
