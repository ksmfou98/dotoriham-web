import { IRemindListResponse } from "types/remind";
import client from "./client";

// 오늘 리마인드 전송 북마크 리스트 조회
export const getRemindListAPI = async () => {
  const response = await client.get<IRemindListResponse>("/api/v1/page/today");
  return response.data;
};

// 리마인드 삭제
export const deleteRemindAPI = async (bookmarkId: string) => {
  const response = await client.delete(`/api/v1/remind/${bookmarkId}`);
  return response.data;
};
