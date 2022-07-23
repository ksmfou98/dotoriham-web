import { useToast } from "domains/@shared/hooks";
import {
  clickCountDotoriAPI,
  deleteDotoriAPI,
  moveDotoriAPI,
  restoreDotoriAPI,
  truncateDotoriAPI,
  updateDotoriAPI,
} from "domains/dotori/apis/dotori";
import { deleteRemindAPI, setRemindAPI } from "lib/api/remind";
import { QueryKey } from "lib/queryKey";
import { useMutation, useQueryClient } from "react-query";
import {
  DotoriMoveRequest,
  DotoriRemindToggleRequest,
  DotoriUpdateRequest,
} from "types/dotori";

function toggleRemindAPI({ dotoriId, remind }: DotoriRemindToggleRequest) {
  switch (remind) {
    case true:
      return deleteRemindAPI(dotoriId);
    case false:
      return setRemindAPI(dotoriId);
  }
}

export default function useDotoriMutation() {
  const queryClient = useQueryClient();
  const { remindDisabledToast, remindSettingToast, errorToast } = useToast();

  // @Note 도토리 리마인드 토글
  const { mutate: mutateRemindToggleDotori } = useMutation(
    (requestData: DotoriRemindToggleRequest) => toggleRemindAPI(requestData),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
        queryClient.invalidateQueries(QueryKey.REMIND_LIST);
        variables.remind ? remindDisabledToast() : remindSettingToast();
      },
      onError: () => {
        errorToast("도토리 리마인드 수정에 실패했습니다. 다시 시도해 주세요.");
      },
    }
  );

  // @Note 도토리 수정
  const { mutate: mutateEditDotori } = useMutation(
    (requestData: DotoriUpdateRequest) => updateDotoriAPI(requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.DOTORI_CONTENTS);
        queryClient.invalidateQueries(QueryKey.REMIND_LIST);
      },
      onError: () => {
        errorToast("도토리 수정을 실패했습니다. 다시 시도해 주세요");
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
        errorToast("도토리 삭제를 실패했습니다. 다시 시도해 주세요");
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
        errorToast("도토리 이동을 실패했습니다. 다시 시도해 주세요");
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
        errorToast("도토리 조회수 증가를 실패했습니다. 다시 시도해 주세요");
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
        errorToast("도토리 복원을 실패했습니다. 다시 시도해 주세요");
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
        errorToast("도토리 영구 삭제를 실패했습니다. 다시 시도해 주세요");
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
    mutateRemindToggleDotori,
  };
}
