import React from "react";
import styled, { css } from "styled-components";
import PagePath from "./PagePath";
import { palette } from "lib/styles/palette";
import { Peoples20Icon, Symbol20Icon } from "assets/icons";

function PageTitle() {
  return (
    <PageTitleBlock>
      <PagePath />
      <TitleRightBox>
        <TitleButton variant="primary">
          <Peoples20Icon /> 초대
        </TitleButton>
        <TitleButton variant="secondary">
          <Symbol20Icon /> 추가
        </TitleButton>
      </TitleRightBox>
    </PageTitleBlock>
  );
}

const PageTitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleRightBox = styled.div`
  display: flex;
  align-items: center;
`;

const TitleButton = styled.button<{ variant: "primary" | "secondary" }>`
  width: 75px;
  height: 30px;
  padding-right: 5px;
  border-radius: 6px;
  margin-right: 8px;
  background-color: ${palette.primary};
  color: ${palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
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
            background-color: #f8f8f8;
          }
        `;
      default:
        return css``;
    }
  }}
`;

export default PageTitle;
