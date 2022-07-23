import {
  changeProfileAPI,
  nicknameCheckAPI,
  uploadProfileImageAPI,
} from "lib/api/user";
import { palette } from "lib/styles/palette";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "stores/user";
import styled from "styled-components";
import { DEFAULT_IMAGE_FILE_NAME } from "./constants";
import ProfileImageForm from "./ProfileImageForm";
import ProfileNicknameForm from "./ProfileNicknameForm";
import { setUser } from "stores/user";
import userStorage from "lib/utils/userStorage";
import Path from "routes/Path";
import Button from "components/Button/Button";
import { useToast } from "domains/@shared/hooks";

function ProfileEditForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [errorMessage, setErrorMessage] = useState("");

  const { editProfileToast } = useToast();

  const [form, setForm] = useState({
    profileImage: user.image,
    imageFileName: DEFAULT_IMAGE_FILE_NAME,
    nickname: user.name,
  });
  const { nickname, profileImage, imageFileName } = form;

  // 닉네임 인풋 상태 변경
  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prevForm) => ({ ...prevForm, nickname: e.target.value }));
    },
    []
  );

  // 프로필 이미지, 이름 상태 변경
  const onChangeProfileImage = useCallback(
    (
      newImg: string,
      newFileName: string | undefined = DEFAULT_IMAGE_FILE_NAME
    ) => {
      setForm((prevForm) => ({
        ...prevForm,
        profileImage: newImg,
        imageFileName: newFileName,
      }));
    },
    []
  );

  // 닉네임 인풋에서 초점을 벗어났을 시에 액션
  const onBlurNickname = useCallback(async () => {
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
  }, [nickname]);

  // 프로필 이미지 업로드
  const onImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [onChangeProfileImage]
  );

  // 업로드 한 프로필 이미지 제거
  const onDeleteImage = useCallback(async () => {
    onChangeProfileImage(user.image); // 초기 값으로 변경
  }, [onChangeProfileImage, user.image]);

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
      editProfileToast();
      navigate(Path.MyPage);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProfileEditFormBlock>
      <ProfileImageForm
        profileImage={profileImage}
        imageFileName={imageFileName}
        onChangeProfileImage={onChangeProfileImage}
        onDeleteImage={onDeleteImage}
        onImageUpload={onImageUpload}
      />
      <ProfileNicknameForm
        nickname={nickname}
        onChangeNickname={onChangeNickname}
        onBlurNickname={onBlurNickname}
        errorMessage={errorMessage}
      />

      <EditButtonGroups>
        <Button
          width="174px"
          height="40px"
          variant="tertiary"
          onClick={() => navigate(-1)}
        >
          뒤로 가기
        </Button>

        <Button
          width="174px"
          height="40px"
          variant="primary"
          className="saveBtn"
          disabled={errorMessage.length > 0}
          onClick={onEditSubmit}
        >
          변경 내용 저장
        </Button>
      </EditButtonGroups>
    </ProfileEditFormBlock>
  );
}

const ProfileEditFormBlock = styled.div`
  padding-top: 24px;
  color: ${palette.grayDarkest};
`;

const EditButtonGroups = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .saveBtn {
    font-weight: 300;
    margin-left: 24px;
  }
`;

export default ProfileEditForm;
