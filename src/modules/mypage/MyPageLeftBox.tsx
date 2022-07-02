import React, { ReactNode } from "react";
import styled from "styled-components";

interface LeftBoxStyle {
  flexDirection: "row" | "column";
}

interface MyPageLeftBoxProps extends LeftBoxStyle {
  children: ReactNode;
}

function MyPageLeftBox({ children, flexDirection }: MyPageLeftBoxProps) {
  return (
    <LeftBoxStyled flexDirection={flexDirection}>{children}</LeftBoxStyled>
  );
}

const LeftBoxStyled = styled.div<LeftBoxStyle>`
  width: 297px;
  display: flex;
  align-items: center;
`;

export default MyPageLeftBox;
