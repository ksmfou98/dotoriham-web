import React from "react";
import styled from "styled-components";
import dotoriFilterMenus from "./DotoriFilterMenus";

function DotoriFilterMenu() {
  return (
    <DotoriFilterMenuBlock>
      <MenuInner>
        {dotoriFilterMenus.map(({ label, text }) => (
          <MenuItem key={`MenuItem_${text}`}>
            <ItemText>{text}</ItemText>
          </MenuItem>
        ))}
      </MenuInner>
    </DotoriFilterMenuBlock>
  );
}

const DotoriFilterMenuBlock = styled.div``;

const MenuInner = styled.div``;

const MenuItem = styled.div``;

const ItemText = styled.span``;

export default DotoriFilterMenu;
