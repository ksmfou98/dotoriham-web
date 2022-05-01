import { palette } from "lib/styles/palette";
import React from "react";
import styled, { css } from "styled-components";

interface ButtonStyledProps {
  /**
   * 버튼 타입
   */
  variant: "primary" | "secondary" | "tertiary" | "quaternary";
  /**
   * 버튼 가로 길이
   */
  width: string;
  /**
   * 버튼 세로 길이
   */
  height: string;
  /**
   * 버튼 둥글기
   */
  borderRadius?: string;
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyledProps {
  children: React.ReactNode;
}

function Button({
  variant,
  width,
  height,
  borderRadius = "6px",
  children,
  ...rest
}: ButtonProps) {
  return (
    <ButtonStyled
      variant={variant}
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...rest}
    >
      {children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  font-size: 14px;
  line-height: 1.5;
  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return css`
          background-color: ${palette.primary};
          color: ${palette.white};
          font-weight: 500;
          border: none;
          &:hover {
            background-color: ${palette.primaryDark};
          }
        `;
      case "secondary":
        return css`
          background-color: ${palette.white};
          color: ${palette.primaryDark};
          border: 1px solid ${palette.primary};
          &:hover {
            background-color: ${palette.hover1};
          }
        `;
      case "tertiary":
        return css`
          background-color: ${palette.white};
          color: ${palette.grayDarkest};
          border: 1px solid ${palette.gray};
        `;
      case "quaternary":
        return css`
          background-color: ${palette.white};
          color: ${palette.grayDarkest};
          border: 1px solid ${palette.grayLight};
        `;
      default:
        return css``;
    }
  }}
  &:disabled {
    background-color: ${palette.grayLightest};
    color: ${palette.gray};
    line-height: 1.42;
    border: none;
    cursor: not-allowed;
  }
`;

export default Button;
