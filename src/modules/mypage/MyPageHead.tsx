import DividerLine from "components/DividerLine/DividerLine";
import LargeBlackText from "components/Text/LargeBlackText";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

interface MyPageHeadProps {
  headText: string;
}

function MyPageHead({ headText }: MyPageHeadProps) {
  return (
    <MyPageHeadBlock>
      <TextBox>
        <LargeBlackText text={headText} />
      </TextBox>
      <DividerLine width="100%" color={palette.grayLight} />
    </MyPageHeadBlock>
  );
}

const MyPageHeadBlock = styled.div`
  width: 100%;
`;

const TextBox = styled.div`
  margin-bottom: 15px;
`;

export default MyPageHead;
