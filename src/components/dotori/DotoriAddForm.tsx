import { BellUnSelectedIcon } from "assets/icons";
import Input from "components/common/Input";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

function DotoriAddForm() {
  return (
    <Container>
      <ImageBox>
        <Image
          src="https://i.ibb.co/t8sxXnv/og-image.png"
          alt="여기다가 og title 넣자"
        />
      </ImageBox>

      <InputBox>
        <Input width="200px" height="28px" placeholder="URL을 입력하세요" />
        <Input width="200px" height="28px" placeholder="제목을 입력하세요" />
        <RemindBox>
          <div className="txt">리마인드 on/off</div>

          <div className="ico">
            <BellUnSelectedIcon />
            off
          </div>
        </RemindBox>
      </InputBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  margin-bottom: 16px;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 12px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  border: none;
  background-color: ${palette.lightGreen};
`;

const InputBox = styled.div`
  input {
    margin-bottom: 8px;
  }
`;

const RemindBox = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  .txt {
    font-size: 10px;
    font-weight: 400;
    color: ${palette.grayDarkest};
  }

  .ico {
    display: flex;
    align-items: center;
    color: ${palette.gray};
    font-weight: 500;
    svg {
      margin-right: 3px;
    }
  }
`;

export default DotoriAddForm;
