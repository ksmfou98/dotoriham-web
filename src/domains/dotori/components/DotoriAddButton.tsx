import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function DotoriAddButton({ ...rest }: Props) {
  return (
    <Container {...rest}>
      <Content>
        <PlusIcon>+</PlusIcon>
        <AddText>URL 직접 등록</AddText>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 273px;
  border-radius: 8px;
  border: 0.7px dashed ${palette.grayLight};
  display: flex;
  min-height: 331px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Content = styled.div`
  color: ${palette.grayLight};
  text-align: center;
  margin-bottom: 35px;
`;

const PlusIcon = styled.div`
  height: 58px;
  font-size: 40px;
  font-weight: 100;
  margin-bottom: 4px;
  line-height: 58px;
`;

const AddText = styled.div`
  font-size: 16px;
`;

export default DotoriAddButton;
