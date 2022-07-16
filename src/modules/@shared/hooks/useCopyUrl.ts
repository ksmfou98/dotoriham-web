import useToast from "./useToast";

export default function useCopyUrl() {
  const { copyToast } = useToast();

  const onCopyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    copyToast();
  };

  return { onCopyUrl };
}
