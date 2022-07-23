import FolderEmoji from "components/Folder/FolderEmoji";
import { useShareFolderNameService } from "domains/share/services";
import React from "react";
import styled from "styled-components";

function ShareFolderName() {
  const { data } = useShareFolderNameService();

  if (!data) return null;

  return (
    <Wrapper>
      <FolderEmoji />
      <FolderName>{data.name}</FolderName>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-top: -10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const FolderName = styled.span`
  margin: 0 4px;
  font-size: 14px;
  height: 16px;
  font-weight: 500;
`;

export default ShareFolderName;
