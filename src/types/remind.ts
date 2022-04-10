import { IDotori } from "./dotori";

export interface IRemindListResponse {
  remindBookmarkList: IDotori[];
}

export interface RemindAlarm {
  id: string;
  title: string;
  pushTime: string;
}

export interface RemindAlarmListResponse {
  contents: RemindAlarm[];
}
