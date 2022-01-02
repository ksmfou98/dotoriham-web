import { FolderIcon } from "assets/icons";
import React from "react";
import { Emoji } from "react-twemoji-picker";
import styled from "styled-components";

interface FolderEmojiProps {
  emoji?: string;
}

function FolderEmoji({ emoji }: FolderEmojiProps) {
  return (
    <>
      {emoji ? (
        <EmojiIcon emoji={{ name: "emoji", unicode: emoji }} />
      ) : (
        <FolderIconStyled />
      )}
    </>
  );
}

const FolderIconStyled = styled(FolderIcon)`
  margin-right: 4px;
`;

const EmojiIcon = styled(Emoji)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export default FolderEmoji;
