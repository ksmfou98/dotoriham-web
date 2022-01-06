import React from "react";
import styled from "styled-components";
import PagePath from "./PagePath";
import { Peoples20Icon, Symbol20Icon } from "assets/icons";
import Button from "components/common/Button";

function PageTitle() {
  return (
    <PageTitleBlock>
      <PagePath />
      <TitleRightBox>
        <TitleButton width="75px" height="30px" variant="primary">
          <Peoples20Icon /> 초대
        </TitleButton>
        <TitleButton width="75px" height="30px" variant="secondary">
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
  margin-bottom: 28px;
`;

const TitleRightBox = styled.div`
  display: flex;
  align-items: center;
`;

const TitleButton = styled(Button)`
  padding-right: 5px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
`;

export default PageTitle;
