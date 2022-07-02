import { X32Icon } from "assets/icons";
import React from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
  visible: boolean;
}

function ModalCloseButton({ onClick, visible }: Props) {
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

export default ModalCloseButton;
