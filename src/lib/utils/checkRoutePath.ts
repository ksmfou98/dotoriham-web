/**
 * @description 현재 페이지가 공유 페이지 인지 체크 
 */
export const isSharePage = () => {
  const { pathname } = window.location;
  return pathname.includes("/share/");
};
