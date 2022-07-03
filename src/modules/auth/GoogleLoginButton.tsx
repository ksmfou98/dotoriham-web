import { GoogleIMG, GoogleIMG2x, GoogleIMG3x } from "assets/images";
import useGoogleLogin from "modules/auth/hooks/useGoogleLogin";
import { palette } from "lib/styles/palette";
import React from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

function GoogleLoginButton() {
  const { clientId, onGoogleLogin } = useGoogleLogin();

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onGoogleLogin}
      render={(renderProps) => (
        <GoogleButton onClick={renderProps.onClick}>
          <GoogleImg
            src={GoogleIMG}
            srcSet={`${GoogleImg} 400w, ${GoogleIMG2x} 700w, ${GoogleIMG3x} 1000w`}
            width="36"
            alt="google"
          />
          <GoogleButtonText>구글 계정으로 원클릭 로그인</GoogleButtonText>
        </GoogleButton>
      )}
    />
  );
}

const GoogleImg = styled.img`
  margin-right: 8px;
`;

const GoogleButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: ${palette.white};
  color: ${palette.grayDarkest};
  border: 1.5px solid ${palette.gray};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoogleButtonText = styled.span`
  font-size: 16px;
  font-weight: 500;
  height: 36px;
  line-height: 32px;
`;

export default GoogleLoginButton;
