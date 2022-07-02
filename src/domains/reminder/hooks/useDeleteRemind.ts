import { deleteRemindAPI } from "lib/api/remind";
import { QueryKey } from "lib/queryKey";
import { useMutation, useQueryClient } from "react-query";

// @Todo 파일 이름을 useDotoriRemindMutation 으로 변경 해야 함

export default function useDeleteRemind() {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteRemind } = useMutation(
    (bookmarkId: string) => deleteRemindAPI(bookmarkId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.REMIND_LIST);
        queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
      },
      onError: () => {
        alert("리마인드 삭제를 실패했습니다. 잠시 후 다시 시도해 주세요");
      },
    }
  );

  return { mutateDeleteRemind };
}
