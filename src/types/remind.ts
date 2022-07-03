import { Dotori } from "./dotori";

export interface IRemindListResponse {
  remindBookmarkList: Dotori[];
}

export interface RemindAlarm {
  id: string;
  title: string;
  pushTime: string;
}

export interface RemindAlarmListResponse {
  contents: RemindAlarm[];
}
