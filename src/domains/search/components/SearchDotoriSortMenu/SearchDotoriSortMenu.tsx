import { palette } from "lib/styles";
import { DOTORI_SORT_MENUS } from "domains/@shared/constants";
import { useOutSideClick } from "domains/@shared/hooks";
import { mergeQsParserWithSearchKeys } from "domains/search/utils";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  isOpenSortMenu: boolean;
  onToggleSortMenu: () => void;
  isActiveSortText: string;
}

function SearchDotoriSortMenu({
  isOpenSortMenu,
  onToggleSortMenu,
  isActiveSortText,
}: Props) {
  const { targetEl } = useOutSideClick(isOpenSortMenu, onToggleSortMenu);
  const navigate = useNavigate();

  return (
    <Block ref={targetEl}>
      <MenuInner>
        {DOTORI_SORT_MENUS.map(({ label, text }) => (
          <MenuItem
            key={`MenuItem_${text}`}
            isSelected={isActiveSortText === text}
            onClick={() =>
              navigate({
                pathname: "/search",
                search: mergeQsParserWithSearchKeys({
                  sort: label,
                }),
              })
            }
          >
            <ItemText>{text}</ItemText>
          </MenuItem>
        ))}
      </MenuInner>
    </Block>
  );
}

const Block = styled.div`
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

export default SearchDotoriSortMenu;
