export interface ILoginResponse {
  name: string;
  nickname: string;
  email: string;
  profileImg: string;
  socialType: "google" | null;
  isRegisterd: boolean;
  remindCycle: number;
  remindToggle: boolean;
  accessToken: string;
  refreshToken: string;
}
