import axios from "axios";
import { SERVER_URL } from "lib/constants";
import { OAuthLoginRequest, LoginResponse, LoginRequest } from "types/auth";

export const oauthLoginAPI = async (loginRequest: OAuthLoginRequest) => {
  const response = await axios.post<LoginResponse>(
    `${SERVER_URL}/api/v1/user/oauth2Login`,
    loginRequest
  );
  return response;
};

export const signupAPI = async (loginRequest: LoginRequest) => {
  const response = await axios.post<LoginResponse>(
    `${SERVER_URL}/api/v1/user/signUp`,
    loginRequest
  );
  return response;
};
