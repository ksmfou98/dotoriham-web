import { palette } from "lib/styles/palette";
import { ellipsis } from "lib/styles/utilStyles";
import React from "react";
import styled from "styled-components";
import { IDotoriItem } from "types/dotori";

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
    checked,
    folderName,
    folderEmoji,
  } = dotori;

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
        </DotoriContent>
      </DotoriItemInner>
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

const DotoriDefaultImage = styled.image``;

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

const DotoriFolderInfo = styled.div``;

export default DotoriListItem;
