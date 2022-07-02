import { ItemId, TreeItem } from "@atlaskit/tree";
import { ArrowDownIcon, ArrowSideIcon } from "assets/icons";
import FolderEmoji from "components/FolderEmoji";
import React from "react";
import styled from "styled-components";

interface FolderItemIconProps {
  item: TreeItem;
  onExpand: (itemId: ItemId) => void;
  onCollapse: (itemId: ItemId) => void;
}

function FolderItemIcon({ item, onExpand, onCollapse }: FolderItemIconProps) {
  return (
    <FolderItemIconWrapper onMouseDown={(e) => e.stopPropagation()}>
      <ArrowButton
        isShow={item.children.length > 0}
        type="button"
        onClick={() =>
          item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
        }
      >
        {item.isExpanded ? <ArrowDownIcon /> : <ArrowSideIcon />}
      </ArrowButton>
      <FolderEmoji emoji={item.data.emoji} />
    </FolderItemIconWrapper>
  );
}

const FolderItemIconWrapper = styled.div`
  display: flex;
`;

const ArrowButton = styled.button<{ isShow: boolean }>`
  padding: 0;
  width: 16px;
  height: 16px;
  visibility: ${(props) => !props.isShow && "hidden"};
  svg {
    margin-right: 2px;
  }
`;

export default FolderItemIcon;
