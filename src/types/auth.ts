export type AuthType = "login" | "signup";

export type ISocialType = "google" | null;

export interface ILoginRequest {
  email: string;
  image: string;
  name: string;
  socialType: ISocialType;
  fcmToken: string;
}

export interface ILoginResponse {
  name: string;
  nickname: string;
  email: string;
  image: string;
  socialType: ISocialType;
  remindCycle: number;
  remindToggle: boolean;
  accessToken: string;
  refreshToken: string;
  isRegistered: boolean;
  fcmToken: string;
}
