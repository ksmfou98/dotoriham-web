import FolderEmoji from "components/Folder/FolderEmoji";
import useToggle from "hooks/useToggle";
import { palette } from "lib/styles/palette";
import { ellipsis } from "lib/styles/utilStyles";
import React from "react";
import { Link } from "react-router-dom";
import Path from "routes/Path";
import styled from "styled-components";
import { ParentFoldersGetResponse } from "types/folder";

interface FolderPathEllipsisProps {
  folderPathList: ParentFoldersGetResponse;
}

function FolderPathEllipsis({ folderPathList }: FolderPathEllipsisProps) {
  const [isOpenEllipsisMenu, onToggleEllipsisMenu] = useToggle();

  return (
    <FolderPathEllipsisStyled>
      <EllipsisText onClick={onToggleEllipsisMenu}>...</EllipsisText>
      {isOpenEllipsisMenu && (
        <>
          <EllipsisMenuBackGround onClick={onToggleEllipsisMenu} />
          <EllipsisMenu>
            {folderPathList.slice(1, folderPathList.length - 1).map((item) => (
              <EllipsisMenuItem
                to={`${Path.DotoriPage}/${item.folderId}`}
                key={item.folderId}
                onClick={onToggleEllipsisMenu}
              >
                <FolderEmoji emoji={item.emoji} />
                <EllipsisMenuItemName>{item.name}</EllipsisMenuItemName>
              </EllipsisMenuItem>
            ))}
          </EllipsisMenu>
        </>
      )}
    </FolderPathEllipsisStyled>
  );
}

const FolderPathEllipsisStyled = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const EllipsisText = styled.span`
  font-size: 10px;
`;

const EllipsisMenuBackGround = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const EllipsisMenu = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 150px;
  background-color: ${palette.white};
  z-index: 150;
  box-shadow: rgba(15 15 15 / 5%) 0px 0px 0px 1px,
    rgba(15 15 15 / 10%) 0px 3px 6px, rgba(15 15 15 / 20%) 0px 9px 24px;
  display: flex;
  flex-direction: column;
`;

const EllipsisMenuItem = styled(Link)`
  font-size: 12px;
  width: 100%;
  height: 28px;
  line-height: 28px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${palette.grayLightest};
  }
`;

const EllipsisMenuItemName = styled.span`
  ${ellipsis}
  display: inline-block;
  width: 100px;
`;

export default FolderPathEllipsis;
