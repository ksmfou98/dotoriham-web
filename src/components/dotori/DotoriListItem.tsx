import {
  BellSelectedIcon,
  BellUnSelectedIcon,
  Copy24Icon,
  More24Icon,
} from "assets/icons";
import DividerLine from "components/common/DividerLine";
import FolderEmoji from "components/common/FolderEmoji";
import useCopyUrl from "hooks/useCopyUrl";
import { palette } from "lib/styles/palette";
import { ellipsis } from "lib/styles/utilStyles";
import React from "react";
import { Link } from "react-router-dom";
import Path from "routes/Path";
import styled from "styled-components";
import { IDotoriItem } from "types/dotori";
import useToast from "hooks/useToast";
import useUpdateDotori from "./hooks/useUpdateDotori";

interface DotoriListItemProps {
  dotori: IDotoriItem;
}

function DotoriListItem({ dotori }: DotoriListItemProps) {
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
  } = dotori;

  const { copyUrlRef, onCopyUrl } = useCopyUrl();
  const { copyToast, remindSettingToast, remindDisabledToast } = useToast();
  const { mutateEditDotori } = useUpdateDotori();

  const onRemindToggle = () => {
    const requestData = {
      bookmarkId: id,
      title,
      remind: !remindTime,
    };
    mutateEditDotori(requestData);
    remindTime ? remindDisabledToast() : remindSettingToast();
  };

  return (
    <DotoriItemBlock>
      <DotoriItemInner>
        <DotoriThumbnail>
          <DotoriOGImage src={image} alt="og-image" />
        </DotoriThumbnail>

        <DotoriContent>
          <InnerContent>
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </InnerContent>

          <DotoriFolderInfo>
            <FolderEmoji emoji={folderEmoji} />
            <DotoriFolderName to={`${Path.DotoriPage}/${folderId}`}>
              {folderName}
            </DotoriFolderName>
          </DotoriFolderInfo>

          <DividerLine color={palette.grayLightest} width="100%" />

          <DotoriBottomArea>
            <DotoriLinkBox>
              <DotoriLink>{link}</DotoriLink>
            </DotoriLinkBox>

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
              <OptionButton>
                <More24Icon />
              </OptionButton>
            </DotoriOption>
          </DotoriBottomArea>
        </DotoriContent>
      </DotoriItemInner>
      <UrlCopyInput ref={copyUrlRef} readOnly value={link} />
    </DotoriItemBlock>
  );
}

const DotoriItemBlock = styled.div`
  margin: 0 24px 40px 0;
  display: flex;
  flex-direction: column;
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

const DotoriItemInner = styled.div`
  flex: 1 auto;
  display: flex;
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
`;

const DotoriLink = styled.a`
  width: 110px;
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

export default DotoriListItem;
