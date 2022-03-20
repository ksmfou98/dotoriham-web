import Input from "components/common/Input";
import SmallBlackText from "components/common/SmallBlackText";
import React from "react";
import styled from "styled-components";

function ProfileNicknameForm() {
  return (
    <NicknameFormBlock>
      <FormLabel width="297px" label="닉네임" />
      <Input width="273px" height="36px" placeholder="닉네임을 입력해주세요" />
    </NicknameFormBlock>
  );
}

const NicknameFormBlock = styled.div`
  display: flex;
`;

const FormLabel = styled(SmallBlackText)`
  padding-top: 8px;
`;

export default ProfileNicknameForm;
