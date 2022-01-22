import { palette } from "lib/styles/palette";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width: string;
  height: string;
  borderRadius?: string;
}

const InputStyled = styled.input<{ borderRadius: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1px solid ${palette.grayLight};
  padding: 5.5px 12px 5.5px 10px;
  border-radius: ${({ borderRadius }) => borderRadius};
  outline: none;
`;

function Input({
  width,
  height,
  borderRadius = "4px",
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
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

export default Input;
