import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

interface SwitchButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  onToggle: () => void;
}

function SwitchButton({ isChecked, onToggle, ...rest }: SwitchButtonProps) {
  return (
    <CheckBox
      type="checkbox"
      onChange={onToggle}
      checked={isChecked}
      {...rest}
    />
  );
}

const CheckBox = styled.input`
  all: unset;
  cursor: pointer;
  width: 32px;
  height: 14px;
  border-radius: 2em;
  display: flex;
  align-items: center;
  /* toggle off */
  background: ${palette.grayLightest};
  ::after {
    content: "";
    z-index: 10;
    left: 0;
    width: 20px;
    height: 20px;
    display: block;
    border-radius: 50%;
    background: ${palette.grayLight};
    position: relative;
    transition: all 0.2s ease-in-out;
  }
  /* toggle on */
  &:checked {
    background-color: rgba(72, 191, 145, 0.4);
    ::after {
      content: "";
      position: relative;
      display: block;
      width: 20px;
      height: 20px;
      left: 14px;
      border-radius: 50%;
      background: ${palette.primary};
      transition: all 0.2s ease-in-out;
    }
  }
`;

export default SwitchButton;
