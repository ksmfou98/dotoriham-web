import React, { ReactNode } from "react";
import styled from "styled-components";

interface MyPageTemplateProps {
  children: ReactNode;
}

function MyPageTemplate({ children }: MyPageTemplateProps) {
  return (
    <MyPageBlock>
      <MyPageInner>{children}</MyPageInner>
    </MyPageBlock>
  );
}

const MyPageBlock = styled.div`
  width: 667px;
  margin: 0 auto;
`;

const MyPageInner = styled.div`
  padding-top: 48px;
`;

export default MyPageTemplate;
