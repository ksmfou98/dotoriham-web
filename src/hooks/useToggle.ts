import { useCallback, useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const onToggle = useCallback(() => setValue(!value), [value]);

  return [value, onToggle, setValue] as const;
}
