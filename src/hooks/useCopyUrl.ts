import { useRef } from "react";

export default function useCopyUrl() {
  const copyUrlRef = useRef<HTMLInputElement>(null);

  const onCopyUrl = async (url: string) => {
    copyUrlRef.current?.select();
    await navigator.clipboard.writeText(url);
  };

  return { copyUrlRef, onCopyUrl };
}
