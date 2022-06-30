import { useRef } from "react";

/**
 * @deprecated
 * 해당 hooks 삭제 후 onCopyUrl만 utils 함수로 옮길 예정
 * Ref가 필요없어짐
 */
export default function useCopyUrl() {
  const copyUrlRef = useRef<HTMLInputElement>(null);

  const onCopyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
  };

  return { copyUrlRef, onCopyUrl };
}
