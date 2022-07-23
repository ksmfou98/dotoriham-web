import useOutSideClick from "domains/@shared/hooks/useOutSideClick";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import { profilePaletteColors } from "./constants";

interface ProfileColorPaletteProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  onChangeProfileImage: (newImg: string, newFileName?: string) => void;
}

function ProfileColorPalette({
  isOpen,
  onToggleOpen,
  onChangeProfileImage,
}: ProfileColorPaletteProps) {
  const { targetEl } = useOutSideClick(isOpen, onToggleOpen);

  return (
    <ProfilePaletteBlock ref={targetEl}>
      <PaletteInner>
        {profilePaletteColors.map((color) => (
          <ColorItem
            key={color.color}
            src={color.image}
            alt={color.color}
            onClick={() => {
              onChangeProfileImage(color.image);
              onToggleOpen();
            }}
          />
        ))}
      </PaletteInner>
    </ProfilePaletteBlock>
  );
}

const ProfilePaletteBlock = styled.div`
  position: absolute;
  left: 55px;
  top: 72px;
  z-index: 102;
`;

const PaletteInner = styled.div`
  width: 144px;
  height: 80px;
  padding: 12px;
  background-color: ${palette.white};
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 ${palette.shadow2};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColorItem = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  cursor: pointer;
  &:nth-child(4n) {
    margin-right: 0px;
  }
`;

export default ProfileColorPalette;
