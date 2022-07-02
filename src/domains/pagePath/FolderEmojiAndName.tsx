import FolderEmoji from "components/FolderEmoji";
import { ellipsis } from "lib/styles/utilStyles";
import React from "react";
import { Link } from "react-router-dom";
import Path from "routes/Path";
import styled from "styled-components";
import { ChildFolderItem } from "types/folder";
import PathText from "./PathText";

function FolderEmojiAndName({ folderInfo }: { folderInfo: ChildFolderItem }) {
  const { emoji, folderId, name } = folderInfo;
  return (
    <PathText pathType="folder">
      <FolderEmoji emoji={emoji} />
      <FolderName to={`${Path.DotoriPage}/${folderId}`}>{name}</FolderName>
    </PathText>
  );
}

const FolderName = styled(Link)`
  margin: 0 4px;
  font-size: 12px;
  height: 16px;
  line-height: 15px;
  ${ellipsis}
  display: inline-block;
  max-width: 135px;
  &:hover {
    text-decoration: underline;
  }
`;

export default FolderEmojiAndName;
