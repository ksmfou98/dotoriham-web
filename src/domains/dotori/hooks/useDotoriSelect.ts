import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dotoriSelector, setDotoris } from "stores/dotori";

export default function useDotoriSelect() {
  const [isDotoriAllChecked, setIsDotoriAllChecked] = useState(false);
  const dotoris = useSelector(dotoriSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dotoris.length === 0) return;
    setIsDotoriAllChecked(dotoris.every((dotori) => dotori.checked));
  }, [dotoris]);

  const isActiveSelectBox = useMemo(() => {
    return dotoris.some((dotori) => dotori.checked);
  }, [dotoris]);

  const onToggleDotoriAllChecked = () => {
    setIsDotoriAllChecked(!isDotoriAllChecked);
    dispatch(
      setDotoris(
        dotoris.map((dotori) => ({
          ...dotori,
          checked: !isDotoriAllChecked,
        }))
      )
    );
  };

  const onToggleDotoriChecked = (dotoriId: string) => {
    dispatch(
      setDotoris(
        dotoris.map((dotori) =>
          dotori.id === dotoriId
            ? { ...dotori, checked: !dotori.checked }
            : dotori
        )
      )
    );
  };

  return {
    isDotoriAllChecked,
    isActiveSelectBox,
    onToggleDotoriAllChecked,
    onToggleDotoriChecked,
  };
}
