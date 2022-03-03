import { ColorizeIcon } from "assets/icons";
import SmallBlackText from "components/common/SmallBlackText";
import useToggle from "hooks/useToggle";
import { palette } from "lib/styles/palette";
import React from "react";
import styled from "styled-components";

interface ProfileImageFormProps {
  form: {
    profileImage: string;
    imageFileName: string;
    nickname: string;
  };
  onChangeProfileImage: (newImg: string, newFileName?: string) => void;
  onDeleteImage: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileImageForm({
  form,
  onChangeProfileImage,
  onDeleteImage,
  onImageUpload,
}: ProfileImageFormProps) {
  const { imageFileName, profileImage } = form;
  const [isPaletteOpen, onTogglePaletteOpen] = useToggle();
  return (
    <ProfileImageFormBlock>
      <FormLabel width="297px" label="프로필 이미지" />
      <ProfileImageBox>
        <ProfileImage src={profileImage} />
        <ProfileColorsButton onClick={onTogglePaletteOpen} />
      </ProfileImageBox>
    </ProfileImageFormBlock>
  );
}

const ProfileImageFormBlock = styled.div`
  margin-bottom: 45px;
  display: flex;
`;

const FormLabel = styled(SmallBlackText)`
  padding-top: 20px;
`;

const ProfileImageBox = styled.div`
  width: 72px;
  height: 72px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  background-color: ${palette.grayLight};
`;

const ProfileColorsButton = styled(ColorizeIcon)`
  position: absolute;
  bottom: -2px;
  right: -11px;
  cursor: pointer;
`;

export default ProfileImageForm;
