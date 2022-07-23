import { palette } from "lib/styles/palette";
import useOutSideClick from "domains/@shared/hooks/useOutSideClick";
import React from "react";
import styled from "styled-components";
import { DOTORI_FILTER_MENUS } from "../utils/constants";
import { FilterMenu } from "types/dotori";

interface DotoriFilterMenuProps {
  isOpenFilterMenu: boolean;
  onToggleFilterMenu: () => void;
  filterType: FilterMenu;
  onChangeFilterType: (filterType: FilterMenu) => void;
}

function DotoriFilterMenu({
  isOpenFilterMenu,
  onToggleFilterMenu,
  filterType,
  onChangeFilterType,
}: DotoriFilterMenuProps) {
  const { targetEl } = useOutSideClick(isOpenFilterMenu, onToggleFilterMenu);

  return (
    <DotoriFilterMenuBlock ref={targetEl}>
      <MenuInner>
        {DOTORI_FILTER_MENUS.map(({ label, text }) => (
          <MenuItem
            key={`MenuItem_${text}`}
            isSelected={filterType.text === text}
            onClick={() => onChangeFilterType({ text, label })}
          >
            <ItemText>{text}</ItemText>
          </MenuItem>
        ))}
      </MenuInner>
    </DotoriFilterMenuBlock>
  );
}

const DotoriFilterMenuBlock = styled.div`
  position: absolute;
  top: 24px;
  right: 5px;
  z-index: 101;
`;

const MenuInner = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: ${palette.white};
  z-index: 9999;
`;

const MenuItem = styled.div<{ isSelected: boolean }>`
  width: 88px;
  height: 34px;
  padding: 7px 2px 9px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    background-color: ${palette.grayLightest};
    cursor: pointer;
  }
  background-color: ${({ isSelected }) => isSelected && palette.grayLightest};
`;

const ItemText = styled.span``;

export default DotoriFilterMenu;
