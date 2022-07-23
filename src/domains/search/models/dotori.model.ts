import { Dotori } from "types/dotori";

export interface DotoriUiModel extends Dotori {
  checked: boolean;
}

export const toDotoriUiModel = (dotoris: Dotori[]): DotoriUiModel[] => {
  return dotoris.map((dotori) => ({ ...dotori, checked: false }));
};
