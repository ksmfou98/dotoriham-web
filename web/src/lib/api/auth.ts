import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "lib/const";
import { ILoginRequest, ILoginResponse } from "types/auth";

export const loginAPI = async (
  loginRequest: ILoginRequest
): Promise<AxiosResponse<ILoginResponse>> => {
  const response = axios.post(
    `${SERVER_URL}/api/v1/user/oauth2Login`,
    loginRequest
  );
  return response;
};
