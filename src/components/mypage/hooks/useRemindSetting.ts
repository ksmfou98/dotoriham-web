import { useToggle } from "hooks";
import { setRemindCycleAPI, toggleRemindSettingAPI } from "lib/api/remind";
import {
  changeRemindCycleLocalInfo,
  changeRemindToggleLocalInfo,
} from "lib/utils/remind";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setRemindCycle, setRemindToggle, userSelector } from "stores/user";

export default function useRemindSetting() {
  const dispatch = useDispatch();
  const { remindToggle, remindCycle } = useSelector(userSelector);
  const [isRemind, onToggleRemind] = useToggle(remindToggle);
  const [selectedCycle, setSelectedCycle] = useState(remindCycle);

  const onChangeSelectedCycle = (cycle: number) => setSelectedCycle(cycle);

  const { mutate: mutateRemindSettingToggle } = useMutation(
    () => toggleRemindSettingAPI(!isRemind),
    {
      onSuccess: () => {
        onToggleRemind();
        changeRemindToggleLocalInfo(!isRemind);
        dispatch(setRemindToggle(!isRemind));
      },
      onError: () => {
        alert("리마인드 토글에 실패했습니다.");
      },
    }
  );

  const { mutate: mutateRemindCycleChange } = useMutation(
    (cycle: number) => setRemindCycleAPI(cycle),
    {
      onSuccess: (_, variable) => {
        onChangeSelectedCycle(variable);
        changeRemindCycleLocalInfo(variable);
        dispatch(setRemindCycle(variable));
      },
      onError: () => {
        alert("리마인드 주기 변경에 실패했습니다.");
      },
    }
  );

  return {
    isRemind,
    onToggleRemind,
    selectedCycle,
    mutateRemindSettingToggle,
    mutateRemindCycleChange,
  };
}
