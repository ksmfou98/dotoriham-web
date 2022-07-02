import Input from "components/Input/Input";
import SmallBlackText from "components/Text/SmallBlackText";
import { palette } from "lib/styles/palette";
import React, { memo } from "react";
import styled from "styled-components";

interface Props {
  nickname: string;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurNickname: () => void;
  errorMessage?: string;
}

function ProfileNicknameForm({
  nickname,
  onBlurNickname,
  onChangeNickname,
  errorMessage,
}: Props) {
  return (
    <NicknameFormBlock>
      <FormLabel width="297px" label="닉네임" />
      <div>
        <Input
          width="273px"
          height="36px"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={onChangeNickname}
          onBlur={onBlurNickname}
        />
        {errorMessage && (
          <NicknameCheckError>{errorMessage}</NicknameCheckError>
        )}
      </div>
    </NicknameFormBlock>
  );
}

const NicknameFormBlock = styled.div`
  display: flex;
  font-size: 14px;
  height: 57px;
  margin-bottom: 88px;
`;

const FormLabel = styled(SmallBlackText)`
  padding-top: 8px;
`;

const NicknameCheckError = styled.div`
  margin: 4px 0 0 0;
  color: ${palette.error};
  font-size: 12px;
`;

export default memo(ProfileNicknameForm);
