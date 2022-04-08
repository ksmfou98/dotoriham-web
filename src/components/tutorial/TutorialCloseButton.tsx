import { X32Icon } from "assets/icons";
import React from "react";
import styled from "styled-components";

interface TutorialCloseButtonProps {
  onClick: () => void;
  visible: boolean;
}

function TutorialCloseButton({ onClick, visible }: TutorialCloseButtonProps) {
  return (
    <CloseButtonStyled visible={visible}>
      <CloaseButton onClick={onClick}>
        <X32Icon />
      </CloaseButton>
    </CloseButtonStyled>
  );
}

const CloseButtonStyled = styled.div<{ visible: boolean }>`
  overflow: hidden;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;

const CloaseButton = styled.button`
  float: right;
`;

export default TutorialCloseButton;
