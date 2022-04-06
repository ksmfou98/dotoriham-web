import {
  clickCountDotoriAPI,
  deleteDotoriAPI,
  moveDotoriAPI,
  restoreDotoriAPI,
  truncateDotoriAPI,
  updateDotoriAPI,
} from "lib/api/dotori";
import { QueryKey } from "lib/queryKey";
import { useMutation, useQueryClient } from "react-query";
import { DotoriMoveRequest, DotoriUpdateRequest } from "types/dotori";

export default function useDotoriMutation() {
  const queryClient = useQueryClient();

  // @Note 도토리 수정
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

  // @Note 도토리 삭제
  const { mutate: mutateDeleteDotori } = useMutation(
    (dotoriIdList: string[]) => deleteDotoriAPI(dotoriIdList),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
      },
      onError: () => {
        alert("도토리 삭제를 실패했습니다. 잠시 후 다시 시도해 주세요");
      },
    }
  );

  // @Note 도토리 이동
  const { mutate: mutateMoveDotori } = useMutation(
    (requestData: DotoriMoveRequest) => moveDotoriAPI(requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
      },
      onError: () => {
        alert("도토리 이동을 실패했습니다. 잠시 후 다시 시도해 주세요");
      },
    }
  );

  // @Note 도토리 클릭
  const { mutate: mutateClickCountDotori } = useMutation(
    (dotoriId: string) => clickCountDotoriAPI(dotoriId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
      },
      onError: () => {
        alert("도토리 조회수 증가를 실패했습니다. 잠시 후 다시 시도해 주세요");
      },
    }
  );

  // @Note 도토리 복원
  const { mutate: mutateRestoreDotori } = useMutation(
    (dotoriIdList: string[]) => restoreDotoriAPI(dotoriIdList),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
      },
      onError: () => {
        alert("도토리 복원을 실패했습니다. 잠시 후 다시 시도해 주세요");
      },
    }
  );

  // @Note 도토리 영구 삭제
  const { mutate: mutateTruncateDotori } = useMutation(
    (dotoriIdList: string[]) => truncateDotoriAPI(dotoriIdList),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
      },
      onError: () => {
        alert("도토리 영구 삭제를 실패했습니다. 잠시 후 다시 시도해 주세요");
      },
    }
  );

  return {
    mutateEditDotori,
    mutateDeleteDotori,
    mutateMoveDotori,
    mutateClickCountDotori,
    mutateRestoreDotori,
    mutateTruncateDotori,
  };
}
