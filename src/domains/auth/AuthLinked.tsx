import { palette } from "lib/styles/palette";
import { Link } from "react-router-dom";
import Path from "routes/Path";
import styled from "styled-components";
import { AuthType } from "types/auth";

interface Props {
  AuthType: AuthType;
}

function AuthLinked({ AuthType }: Props) {
  const loginlinked = [
    {
      info: "비밀번호를 잊으셨나요?",
      label: "비밀번호 재설정",
      //   link: Path.ResetPasswordPage,
      link: Path.LoginPage,
    },
    {
      info: "처음 방문하셨나요?",
      label: "회원가입",
      link: Path.SignupPage,
    },
  ];

  const registerlinked = [
    {
      info: "이미 회원이신가요?",
      label: "로그인",
      link: "/login",
    },
  ];

  const linked = AuthType === "login" ? loginlinked : registerlinked;
  return (
    <AuthLinkedWrapper>
      {linked.map((item) => {
        const { info, label, link } = item;
        return (
          <LinkedItem key={label}>
            <LinkedInfo>{info}</LinkedInfo>
            <Linked to={link}>{label}</Linked>
          </LinkedItem>
        );
      })}
    </AuthLinkedWrapper>
  );
}

const AuthLinkedWrapper = styled.div`
  margin-top: 24px;
  font-size: 14px;
  line-height: 1.5;
`;

const LinkedItem = styled.div`
  &:first-child {
    margin-bottom: 12px;
  }
`;

const LinkedInfo = styled.span`
  margin-right: 16px;
  color: ${palette.grayDarkest};
`;

const Linked = styled(Link)`
  color: ${palette.link0};
  text-decoration: underline;
`;

export default AuthLinked;
