import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";
import ProfileImageForm from "./ProfileImageForm";
import ProfileNicknameForm from "./ProfileNicknameForm";

function ProfileEditForm() {
  return (
    <ProfileEditFormBlock>
      <ProfileImageForm />
      <ProfileNicknameForm />
    </ProfileEditFormBlock>
  );
}

const ProfileEditFormBlock = styled.div`
  padding-top: 24px;
  color: ${palette.grayDarkest};
`;

export default ProfileEditForm;
