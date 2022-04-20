import { IRemindListResponse, RemindAlarmListResponse } from "types/remind";
import client from "./client";

// 오늘 리마인드 전송 북마크 리스트 조회
export const getRemindListAPI = async () => {
  const response = await client.get<IRemindListResponse>("/api/v1/page/today");
  return response.data;
};

// @Note  remind 설정 API
export const setRemindAPI = async (dotoriId: string) => {
  const response = await client.post(`/api/v1/remind/${dotoriId}`);
  return response.data;
};

// 리마인드 삭제
export const deleteRemindAPI = async (bookmarkId: string) => {
  const response = await client.delete(`/api/v1/remind/${bookmarkId}`);
  return response.data;
};

// @Note 유저 리마인드 설정 토글
export const toggleRemindSettingAPI = async (remindToggle: boolean) => {
  const response = await client.patch(`/api/v1/mypage/remind/toggle`, {
    remindToggle,
  });
  return response.data;
};

// @Note 유저 리마인드 주기 설정
export const setRemindCycleAPI = async (remindCycle: number) => {
  const response = await client.post(`/api/v1/mypage/remind/cycle`, {
    remindCycle,
  });
  return response.data;
};

// @Note 리마인드 알림 리스트 조회
export const getRemindAlarmListAPI = async () => {
  const response = await client.get<RemindAlarmListResponse>(`/api/v1/remind`);
  return response.data;
};
