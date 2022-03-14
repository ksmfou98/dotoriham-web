/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  changeProfileAPI,
  nicknameCheckAPI,
  uploadProfileImageAPI,
} from "lib/api/user";
import { palette } from "lib/styles/palette";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "stores/user";
import styled from "styled-components";
import { DEFAULT_IMAGE_FILE_NAME } from "./constants";
import ProfileEditButtonGroup from "./ProfileEditButtonGroup";
import ProfileImageForm from "./ProfileImageForm";
import ProfileNicknameForm from "./ProfileNicknameForm";
import { setUser } from "stores/user";
import userStorage from "lib/utils/userStorage";
import Path from "routes/Path";

function ProfileEditForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    profileImage: user.image,
    imageFileName: DEFAULT_IMAGE_FILE_NAME,
    nickname: user.name,
  });
  const { nickname, profileImage } = form;
  // 닉네임 인풋 상태 변경
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, nickname: e.target.value });
  };

  // 프로필 이미지, 이름 상태 변경
  const onChangeProfileImage = (
    newImg: string,
    newFileName: string | undefined = DEFAULT_IMAGE_FILE_NAME
  ) => {
    setForm({ ...form, profileImage: newImg, imageFileName: newFileName });
  };

  // 닉네임 인풋에서 초점을 벗어났을 시에 액션
  const onKeyUpNickname = async () => {
    if (nickname.length === 0) {
      setErrorMessage("닉네임을 입력해주세요");
      return;
    }
    try {
      await nicknameCheckAPI(nickname);
      setErrorMessage("");
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.message === "이미 존재하는 닉네임입니다") {
          setErrorMessage(e.message);
        }
      }
    }
  };

  // 프로필 이미지 업로드
  const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      if (e.target.files[0].size > 10000000) {
        alert("파일 용량이 10MB를 초과하였습니다.");
        return;
      }

      const fd = new FormData();
      fd.append("image", e.target.files[0]);
      try {
        const data = await uploadProfileImageAPI(fd);
        onChangeProfileImage(data.imageUrl, e.target.files[0].name);
        console.log(data);
      } catch (err) {
        console.log(err);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  // 업로드 한 프로필 이미지 제거
  const onDeleteImage = async () => {
    onChangeProfileImage(user.image); // 초기 값으로 변경
  };

  const onEditSubmit = async () => {
    try {
      await changeProfileAPI(profileImage, nickname);
      const newUserInfo = {
        ...user,
        image: profileImage,
        name: nickname,
      };
      dispatch(setUser(newUserInfo));
      userStorage.set(newUserInfo);

      navigate(Path.MyPage);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProfileEditFormBlock>
      <ProfileImageForm
        form={form}
        onChangeProfileImage={onChangeProfileImage}
        onDeleteImage={onDeleteImage}
        onImageUpload={onImageUpload}
      />
      <ProfileNicknameForm />
      <ProfileEditButtonGroup />
    </ProfileEditFormBlock>
  );
}

const ProfileEditFormBlock = styled.div`
  padding-top: 24px;
  color: ${palette.grayDarkest};
`;

export default ProfileEditForm;
