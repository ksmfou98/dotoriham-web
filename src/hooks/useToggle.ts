import { useState } from "react";

type ReturnTypes = [boolean, () => void];

export default function useToggle(initialValue = false): ReturnTypes {
  const [value, setValue] = useState(initialValue);

  const onToggle = () => {
    setValue(!value);
  };

  return [value, onToggle];
}
