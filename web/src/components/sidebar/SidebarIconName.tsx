import { palette } from "lib/styles/palette";
import React from "react";
import styled, { css } from "styled-components";

interface SidebarIconNameProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  name: string;
  activeIcon: JSX.Element;
  unActiveIcon: JSX.Element;
}

function SidebarIconName({
  isActive,
  name,
  activeIcon,
  unActiveIcon,
  ...rest
}: SidebarIconNameProps) {
  return (
    <SidebarIconNameStyled {...rest}>
      <IconBox>{isActive ? activeIcon : unActiveIcon}</IconBox>
      <Name active={isActive}>{name}</Name>
    </SidebarIconNameStyled>
  );
}

const SidebarIconNameStyled = styled.button`
  display: flex;
  height: 21px;
  width: 166px;
  margin-bottom: 8px;
`;

const IconBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 6px;
`;

const Name = styled.span<{ active?: boolean }>`
  height: 100%;
  font-size: 14px;
  line-height: 21px;
  ${({ active }) =>
    active
      ? css`
          color: ${palette.primary};
          font-weight: 500;
        `
      : css`
          color: #9d9c9c;
          font-weight: 400;
        `}
`;

export default SidebarIconName;
