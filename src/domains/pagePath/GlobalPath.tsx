import { getGlobalPagePath } from "domains/dotori/utils/dotori";
import React from "react";
import { DotoriPathTypes } from "types/dotori";
import PathText from "./PathText";

interface GlobalPathProps {
  path: DotoriPathTypes;
  isModal?: boolean;
}

function GlobalPath({ path, isModal }: GlobalPathProps) {
  const pathName = getGlobalPagePath(path);
  if (!pathName) return null;

  return (
    <PathText pathType="global" isModal={isModal}>
      {pathName}
    </PathText>
  );
}

export default GlobalPath;
