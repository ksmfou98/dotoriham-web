import Button from "components/common/Button";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import MyPageHead from "./MyPageHead";
import MyPageLeftBox from "./MyPageLeftBox";

function MyPageProfile() {
  return (
    <>
      <MyPageHead headText="프로필" />
      <MyPageProfileBlock>
        <MyPageLeftBox flexDirection="row">
          <ProfileImageBox>
            <ProfileImage src="https://media.vlpt.us/images/ksmfou98/profile/64dd2ca6-c4a8-4059-9192-8f8f780dd265/social.jpeg?w=120" />
          </ProfileImageBox>
          <Nickname>이도현</Nickname>
        </MyPageLeftBox>

        <Button variant="tertiary" width="174px" height="36px">
          프로필 편집
        </Button>
      </MyPageProfileBlock>
    </>
  );
}

const MyPageProfileBlock = styled.div`
  padding: 24px 0 104px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProfileImageBox = styled.div`
  width: 72px;
  height: 72px;
  margin-right: 28px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Nickname = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${palette.black};
`;

export default MyPageProfile;
