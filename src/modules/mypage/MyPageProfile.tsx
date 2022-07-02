import Button from "components/Button/Button";
import { palette } from "lib/styles/palette";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Path from "routes/Path";
import { userSelector } from "stores/user";
import styled from "styled-components";
import MyPageHead from "./MyPageHead";
import MyPageLeftBox from "./MyPageLeftBox";

function MyPageProfile() {
  const { image, name } = useSelector(userSelector);
  const navigate = useNavigate();

  return (
    <>
      <MyPageHead headText="프로필" />
      <MyPageProfileBlock>
        <MyPageLeftBox flexDirection="row">
          <ProfileImageBox>
            <ProfileImage src={image} alt="프로필 이미지" />
          </ProfileImageBox>
          <Nickname>{name}</Nickname>
        </MyPageLeftBox>

        <Button
          variant="tertiary"
          width="174px"
          height="36px"
          onClick={() => navigate(Path.ProfileEditPage)}
        >
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
  border-radius: 40px;
  background-color: ${palette.grayLight};
`;

const Nickname = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${palette.black};
`;

export default MyPageProfile;
