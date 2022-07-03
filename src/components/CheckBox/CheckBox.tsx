import {
  CheckBox24Icon,
  CheckBox36Icon,
  CheckBoxSelected24Icon,
  CheckBoxSelected36Icon,
} from "assets/icons";
import React, { memo } from "react";
import styled from "styled-components";

interface IChecked {
  isChecked: boolean;
}

interface CheckBoxProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    IChecked {
  variant: "primary" | "secondary";
}

function PrimaryCheckBox({ isChecked }: IChecked) {
  return <>{isChecked ? <CheckBoxSelected36Icon /> : <CheckBox36Icon />}</>;
}

function SecondaryCheckBox({ isChecked }: IChecked) {
  return <>{isChecked ? <CheckBoxSelected24Icon /> : <CheckBox24Icon />}</>;
}

function CheckBox({ isChecked, variant, ...rest }: CheckBoxProps) {
  return (
    <CheckBoxStyled {...rest}>
      {variant === "primary" ? (
        <PrimaryCheckBox isChecked={isChecked} />
      ) : (
        <SecondaryCheckBox isChecked={isChecked} />
      )}
    </CheckBoxStyled>
  );
}

const CheckBoxStyled = styled.button``;

export default memo(CheckBox);
