import { Symbol36Icon, X16Icon } from "assets/icons";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

interface RemindListItemProps {
  remindData: any; // 나중에 백앤드랑 연동할 때 IBookmarkItem 으로 교체해야함
}

function RemindListItem({ remindData }: RemindListItemProps) {
  const { title, description, image, link } = remindData;

  const remindText = title | description;

  return (
    <RemindListItemBlock href={link} target="_blank" rel="noopener noreferrer">
      <RemindItemLeftBox>
        {image ? (
          <RemindItemImage src={image} />
        ) : (
          <RemindItemDefaultImage>
            <Symbol36Icon />
          </RemindItemDefaultImage>
        )}
      </RemindItemLeftBox>
      <RemindItemRightBox>
        <DeleteButton
          onClick={(e) => {
            e.preventDefault(); // @Note Delete 버튼은 a태그의 새창 열기를 막기 위해
          }}
        />
        <RightBoxText>{remindText}</RightBoxText>
      </RemindItemRightBox>
    </RemindListItemBlock>
  );
}

const RemindListItemBlock = styled.a`
  width: 174px;
  height: 96px;
  display: flex;
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 2px;
  border: 1px solid ${palette.grayLight};
`;

const RemindItemLeftBox = styled.div`
  width: 94px;
  height: 100%;
  position: relative;
`;

const RemindItemDefaultImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background-color: ${palette.primaryLight};
`;

const RemindItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9px 0 0 9px;
`;

const RemindItemRightBox = styled.div`
  width: 80px;
  height: 100%;
  border-radius: 0 10px 10px 0;
  display: flex;
  align-items: flex-end;
  padding: 42px 12px 12px 10px;
  position: relative;
`;

const RightBoxText = styled.p`
  word-break: break-all;
  margin: 0;
  overflow-wrap: break-word;
  font-size: 10px;
  line-height: 1.5;
  max-height: 42px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteButton = styled(X16Icon)`
  position: absolute;
  top: 8px;
  right: 10px;
  cursor: pointer;
  z-index: 105;
`;

export default RemindListItem;