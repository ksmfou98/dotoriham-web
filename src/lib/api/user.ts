import getTokens from "lib/utils/getTokens";
import client from "./client";

export const nicknameCheckAPI = async (nickname: string) => {
  const response = await client.post("/api/v1/user/nickNameCheck", {
    nickname,
  });
  return response.data;
};

export const uploadProfileImageAPI = async (image: FormData) => {
  const response = await client.post("/api/v1/user/uploadProfileImage", image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
