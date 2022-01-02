import Button from "components/common/Button";
import React from "react";
import styled from "styled-components";
import PagePath from "./PagePath";

function PageTitle() {
  return (
    <PageTitleBlock>
      <PagePath />
      <TitleRightBox>
        <AddDotoriButton
          variant="primary"
          label="도토리 추가"
          width="120px"
          height="30px"
        />
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

const AddDotoriButton = styled(Button)`
  font-size: 14px;
  font-weight: 700;
`;

export default PageTitle;
