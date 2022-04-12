import { Symbol36Icon, X16Icon } from "assets/icons";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { IDotori } from "types/dotori";
import useDeleteRemind from "./hooks/useDeleteRemind";

interface RemindListItemProps {
  remindData: IDotori;
}

function RemindListItem({ remindData }: RemindListItemProps) {
  const { title, description, image, link, id } = remindData;
  const remindText = title || description;

  const { mutateDeleteRemind } = useDeleteRemind();

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
            mutateDeleteRemind(id);
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
  margin-top: 1px;
  box-shadow: 0 0 0px 1px ${palette.grayLight}; ;
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
  border-radius: 10px 0px 0px 10px;
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
