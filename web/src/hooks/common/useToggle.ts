import { useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const onToggle = () => {
    setValue(!value);
  };

  return [value, onToggle];
}
