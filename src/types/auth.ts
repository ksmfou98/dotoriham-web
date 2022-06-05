export type AuthType = "login" | "signup";

export type ISocialType = "google" | null;

export interface OAuthLoginRequest {
  email: string;
  image: string;
  name: string;
  socialType: ISocialType;
  fcmToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  fcmToken: string;
}

export interface LoginResponse {
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
