import {
  BellSelectedIcon,
  BellUnSelectedIcon,
  Copy24Icon,
  More24Icon,
  Symbol36Icon,
} from "assets/icons";
import DividerLine from "domains/common/DividerLine";
import FolderEmoji from "domains/common/FolderEmoji";
import useCopyUrl from "hooks/useCopyUrl";
import { palette } from "lib/styles/palette";
import { ellipsis } from "lib/styles/utilStyles";
import React, { memo, SyntheticEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Path from "routes/Path";
import styled from "styled-components";
import { IDotoriItem } from "types/dotori";
import useToast from "hooks/useToast";
import useDotoriSelect from "./hooks/useDotoriSelect";
import CheckBox from "domains/common/CheckBox";
import useDotoriMutation from "./hooks/useDotoriMutation";
import DotoriItemMenu from "./DotoriItemMenu";
import { useSelector } from "react-redux";
import { userSelector } from "stores/user";
import { isSharePage } from "lib/utils/checkRoutePath";

interface DotoriListItemProps {
  dotori: IDotoriItem;
  isActiveDotoriMenu: boolean;
  onActiveDotoriMenu: (dotori: IDotoriItem, isOpen: boolean) => void;
  onToggleDeleteModal: () => void;
  onToggleEditModal: () => void;
  onToggleMoveModal: () => void;
}

function DotoriListItem({
  dotori,
  isActiveDotoriMenu,
  onActiveDotoriMenu,
  onToggleDeleteModal,
  onToggleEditModal,
  onToggleMoveModal,
}: DotoriListItemProps) {
  const {
    id,
    title,
    description,
    link,
    remindTime,
    folderId,
    image,
    folderName,
    folderEmoji,
    checked,
  } = dotori;

  const [imageLoadError, setImageLoadError] = useState(false);

  const { remindToggle } = useSelector(userSelector);
  const location = useLocation();
  const { copyUrlRef, onCopyUrl } = useCopyUrl();
  const { copyToast, remindRecommendationToast } = useToast();
  const { mutateRemindToggleDotori, mutateClickCountDotori } =
    useDotoriMutation();
  const { isActiveSelectBox, onToggleDotoriChecked } = useDotoriSelect();

  const onRemindToggle = () => {
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

  const onImageloadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoadError(true);
  };

  return (
    <DotoriItemBlock>
      <DotoriItemInner>
        <DotoriThumbnail
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => mutateClickCountDotori(id)}
        >
          {image && !imageLoadError ? (
            <DotoriOGImage
              src={image}
              alt="og-image"
              onError={onImageloadError}
            />
          ) : (
            <DotoriDefaultImage>
              <SymbolIcon />
            </DotoriDefaultImage>
          )}

          {isActiveSelectBox && (
            <SelectButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onToggleDotoriChecked(id);
              }}
              variant="primary"
              isChecked={checked}
            />
          )}
        </DotoriThumbnail>

        <DotoriContent>
          <InnerContent
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => mutateClickCountDotori(id)}
          >
            <div className="title">{title || "제목없음"}</div>
            <div className="description">{description}</div>
          </InnerContent>

          {!isSharePage() && folderName && (
            <DotoriFolderInfo>
              <FolderEmoji emoji={folderEmoji} />
              <DotoriFolderName to={`${Path.DotoriPage}/${folderId}`}>
                {folderName}
              </DotoriFolderName>
            </DotoriFolderInfo>
          )}

          <DividerLine color={palette.grayLightest} width="100%" />

          <DotoriBottomArea>
            <DotoriLinkBox>
              <DotoriLink
                isFullWidth={isSharePage()}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => mutateClickCountDotori(id)}
              >
                {link}
              </DotoriLink>
            </DotoriLinkBox>

            {location.pathname !== Path.TrashPage && !isSharePage() && (
              <DotoriOption>
                <OptionButton onClick={onRemindToggle}>
                  {remindTime ? <BellSelectedIcon /> : <BellUnSelectedIcon />}
                </OptionButton>

                <OptionButton
                  onClick={() => {
                    onCopyUrl(link);
                    copyToast();
                  }}
                >
                  <Copy24Icon />
                </OptionButton>

                <OptionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onActiveDotoriMenu(dotori, true);
                  }}
                >
                  <More24Icon />
                  {isActiveDotoriMenu && (
                    <DotoriItemMenu
                      isOpen={isActiveDotoriMenu}
                      onClose={() => onActiveDotoriMenu(dotori, false)}
                      onToggleDeleteModal={onToggleDeleteModal}
                      onToggleEditModal={onToggleEditModal}
                      onToggleMoveModal={onToggleMoveModal}
                    />
                  )}
                </OptionButton>
              </DotoriOption>
            )}
          </DotoriBottomArea>
        </DotoriContent>
        {checked && <SelectedStyled />}
        <UrlCopyInput ref={copyUrlRef} readOnly value={link} />
      </DotoriItemInner>
    </DotoriItemBlock>
  );
}

const DotoriItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DotoriItemInner = styled.div`
  flex: 1 auto;
  display: flex;
  min-height: 350px;
  flex-direction: column;
  border-radius: 8px;
  position: relative;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  box-shadow: 0 1px 4px 0 ${palette.shadow0};
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 20px 0 ${palette.shadow3};
    z-index: 9999;
  }
`;

const DotoriThumbnail = styled.a`
  width: 273px;
  height: 152px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DotoriOGImage = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const DotoriDefaultImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${palette.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SymbolIcon = styled(Symbol36Icon)`
  width: 60px;
  height: 60px;
`;

const SelectButton = styled(CheckBox)`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 100;
`;

const DotoriContent = styled.div`
  padding: 14px 20px 15px;
  width: 273px;
  display: flex;
  flex-direction: column;
  flex: 1 auto;
`;

const InnerContent = styled.a`
  flex: 1 auto;
  .title {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    width: 233px;
    color: ${palette.black};
    margin-bottom: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .description {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42;
    width: 233px;
    color: ${palette.grayDarkest};
    margin-bottom: 23.5px;
    ${ellipsis};
  }
`;

const DotoriFolderInfo = styled.div`
  margin-bottom: 11px;
  display: flex;
  align-items: center;
`;

const DotoriFolderName = styled(Link)`
  font-size: 10px;
  color: ${palette.gray};
  height: 16px;
  line-height: 16px;
  display: inline-block;
  margin-left: 4px;
  max-width: 135px;
  ${ellipsis}
  &:hover {
    text-decoration: underline;
  }
`;

const DotoriBottomArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
`;

const DotoriLinkBox = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const DotoriLink = styled.a<{ isFullWidth: boolean }>`
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "100px")};
  font-size: 12px;
  line-height: 1.42;
  color: ${palette.gray};
  ${ellipsis}
`;

const DotoriOption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90px;
`;

const OptionButton = styled.button`
  position: relative;
`;

const UrlCopyInput = styled.input`
  display: none;
`;

const SelectedStyled = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px ${palette.primary};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${palette.shadow1};
  border-radius: 8px;
`;

export default memo(DotoriListItem);
