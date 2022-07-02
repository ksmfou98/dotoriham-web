import Button from "components/Button/Button";
import SmallBlackText from "components/Text/SmallBlackText";
import { palette } from "lib/styles/palette";
import { logout } from "lib/utils/auth";
import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "stores/user";
import styled from "styled-components";
import MyPageHead from "./MyPageHead";

function MyPageAccountSetting() {
  const { email } = useSelector(userSelector);

  return (
    <>
      <MyPageHead headText="계정 설정" />
      <AccountSettingBlock>
        <AccountInfoBox>
          <SmallBlackText width="297px" label="이메일" />
          <AccountText>{email}</AccountText>
        </AccountInfoBox>

        <AccountInfoBox>
          <SmallBlackText width="297px" label="비밀번호" />
          {/* @TODO(dohyun) 일반계정이면 ? 비밀번호 변경 구글계정이면 ? 비밀번호 변경 불가 */}
          <Button variant="secondary" width="174px" height="36px" disabled>
            비밀번호 변경
          </Button>
        </AccountInfoBox>

        <LogoutText onClick={logout}>로그아웃 하시겠어요?</LogoutText>
      </AccountSettingBlock>
    </>
  );
}

const AccountSettingBlock = styled.div`
  padding: 28px 0 138px;
  font-size: 14px;
  line-height: 1.5;
  color: ${palette.grayDarkest};
`;

const AccountInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
`;

const AccountText = styled.span`
  font-family: "Roboto";
`;

const LogoutText = styled.button`
  color: ${palette.gray};
`;

export default MyPageAccountSetting;
