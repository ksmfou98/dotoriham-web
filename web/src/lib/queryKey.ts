import { DotoriPathTypes } from "hooks/dotori/useDotoriQuery";
import { DotoriSortType } from "types/dotori";

export enum QueryKey {
  DOTORI_CONTENTS = "dotoriContents",
}

export const ReactQueryKey = {
  dotoriContents: (
    path: DotoriPathTypes,
    dynamicKey: string | number,
    page: number,
    remind: boolean,
    sort: DotoriSortType
  ) =>
    [QueryKey.DOTORI_CONTENTS, path, dynamicKey, page, remind, sort] as const,
};
