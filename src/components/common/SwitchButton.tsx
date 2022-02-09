import { ToggleOffIcon, ToggleOnIcon } from "assets/icons";
import React from "react";
import styled from "styled-components";

interface SwitchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isToggled: boolean;
}

function SwitchButton({ isToggled, ...rest }: SwitchButtonProps) {
  return (
    <SwitchButtonStyled {...rest}>
      {isToggled ? <ToggleOnIcon /> : <ToggleOffIcon />}
    </SwitchButtonStyled>
  );
}

const SwitchButtonStyled = styled.button``;

export default SwitchButton;
