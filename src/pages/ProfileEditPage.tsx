import MyPageHead from "components/mypage/MyPageHead";
import MyPageTemplate from "components/mypage/MyPageTemplate";
import ProfileEditForm from "components/mypage/ProfileEditForm";
import React from "react";
import styled from "styled-components";

function ProfileEditPage() {
  return (
    <ProfileEditPageBlock>
      <MyPageHead headText="프로필" />
      <ProfileEditForm />
    </ProfileEditPageBlock>
  );
}

const ProfileEditPageBlock = styled(MyPageTemplate)`
  width: 768px;
`;

export default ProfileEditPage;
