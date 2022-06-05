import { palette } from "lib/styles/palette";
import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input 가로 길이
   */
  width: string;
  /**
   * Input 세로 길이
   */
  height: string;
  /**
   * Input 둥글기
   */
  borderRadius?: string;
  /**
   * 포커스 여뿌
   * 기본 값 : false
   */
  autoFocus?: boolean;
}

function Input({
  width,
  height,
  borderRadius = "4px",
  autoFocus = false,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <InputStyled
      {...rest}
      borderRadius={borderRadius}
      width={width}
      height={height}
      ref={inputRef}
    />
  );
}

const InputStyled = styled.input<{ borderRadius: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1px solid ${palette.grayLight};
  padding: 5.5px 12px 5.5px 10px;
  border-radius: ${({ borderRadius }) => borderRadius};
  outline: none;
  font-size: 12px;
  &::placeholder {
    color: ${palette.grayDark};
  }
`;

export default memo(Input);
