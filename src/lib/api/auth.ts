import axios from "axios";
import { SERVER_URL } from "lib/constants";
import { ILoginRequest, ILoginResponse } from "types/auth";

export const loginAPI = async (loginRequest: ILoginRequest) => {
  const response = await axios.post<ILoginResponse>(
    `${SERVER_URL}/api/v1/user/oauth2Login`,
    loginRequest
  );
  return response;
};
