import { updateDotoriAPI } from "lib/api/dotori";
import { QueryKey } from "lib/queryKey";
import { useMutation, useQueryClient } from "react-query";
import { DotoriUpdateRequest } from "types/dotori";

export default function useUpdateDotori() {
  const queryClient = useQueryClient();

  const { mutate: mutateEditDotori } = useMutation(
    (requestData: DotoriUpdateRequest) => updateDotoriAPI(requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
        queryClient.invalidateQueries(QueryKey.REMIND_LIST);
      },
      onError: () => {
        alert("도토리 수정을 실패했습니다. 잠시 후 다시 시도해 주세요");
      },
    }
  );

  return { mutateEditDotori };
}
