import { toast } from "react-toastify";

export const ToastSize = {
  big: "big-toast" as const,
  small: "small-toast" as const,
};

export type ToastSizeKeyTypes = keyof typeof ToastSize;

export default function useToast() {
  const { big, small } = ToastSize;

  const remindSettingToast = () =>
    toast("⏰ 리마인드 알림이 설정됐어요! ⏰", {
      className: small,
    });

  const remindDisabledToast = () =>
    toast("⏰ 리마인드 알림이 해제됐어요! ⏰", {
      className: small,
    });

  const remindRecommendationToast = () =>
    toast("⏰ 마이페이지에서 알람을 ON으로 설정해주세요! ⏰", {
      className: big,
    });

  const copyToast = () =>
    toast("😀 링크를 복사했어요! 😀", {
      className: small,
    });

  const remindNoticeToast = () =>
    toast("⏰ 이후 알림 설정한 도토리부터 적용돼요 ⏰", {
      className: big,
    });

  const createFolderErrorToast = () =>
    toast("😥 만들 수 있는 폴더 개수를 초과했어요! 😥", {
      className: big,
    });

  const cabinetIsFullToast = () =>
    toast("😥 이 보관함은 이미 가득 찼어요! 😥", {
      className: small,
    });

  const folderIsFull = () =>
    toast("😥 이 폴더는 이미 가득 찼어요! 😥", {
      className: small,
    });

  const editProfileToast = () =>
    toast("😀 프로필 정보를 수정했어요! 😀", {
      className: small,
    });

  const changePasswordToast = () =>
    toast("😀 비밀번호를 변경했어요! 😀", {
      className: small,
    });

  const errorToast = (
    message: string,
    className: ToastSizeKeyTypes = "big"
  ) => {
    toast(`❗ ${message} ❗`, {
      className: className,
    });
  };

  return {
    remindSettingToast,
    remindDisabledToast,
    remindRecommendationToast,
    copyToast,
    remindNoticeToast,
    createFolderErrorToast,
    cabinetIsFullToast,
    folderIsFull,
    editProfileToast,
    changePasswordToast,
    errorToast,
  };
}
