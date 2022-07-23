import { Copy24Icon, Symbol36Icon } from "assets/icons";
import { DividerLine, FolderEmoji } from "components";
import { useCopyUrl } from "domains/@shared/hooks";
import { ellipsis, palette } from "lib/styles";
import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { Dotori } from "types/dotori";

interface Props {
  dotori: Dotori;
}

function ShareDotoriListItem({ dotori }: Props) {
  const { description, folderEmoji, folderName, image, link, title } = dotori;

  const [imageLoadError, setImageLoadError] = useState(false);
  const { onCopyUrl } = useCopyUrl();

  const onImageloadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoadError(true);
  };

  return (
    <DotoriItemBlock>
      <DotoriItemInner>
        <DotoriThumbnail href={link} target="_blank" rel="noopener noreferrer">
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
        </DotoriThumbnail>

        <DotoriContent>
          <InnerContent href={link} target="_blank" rel="noopener noreferrer">
            <div className="title">{title || "제목없음"}</div>
            <div className="description">{description}</div>
          </InnerContent>

          <DotoriFolderInfo>
            <FolderEmoji emoji={folderEmoji} />
            <DotoriFolderName>{folderName}</DotoriFolderName>
          </DotoriFolderInfo>

          <DividerLine color={palette.grayLightest} width="100%" />

          <DotoriBottomArea>
            <DotoriLink href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </DotoriLink>

            <OptionButton onClick={() => onCopyUrl(link)}>
              <Copy24Icon />
            </OptionButton>
          </DotoriBottomArea>
        </DotoriContent>
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

const DotoriFolderName = styled.span`
  font-size: 10px;
  color: ${palette.gray};
  height: 16px;
  line-height: 16px;
  display: inline-block;
  margin-left: 4px;
  max-width: 135px;
  ${ellipsis}
`;

const DotoriBottomArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
`;

const DotoriLink = styled.a`
  width: 100%;
  font-size: 12px;
  line-height: 1.42;
  color: ${palette.gray};
  ${ellipsis}
`;

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0px;
  margin: 0 2px;
`;

export default ShareDotoriListItem;
