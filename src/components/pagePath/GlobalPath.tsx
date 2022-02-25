import getGlobalPagePath from "lib/utils/getGlobalPagePath";
import React from "react";
import { DotoriPathTypes } from "types/dotori";
import PathText from "./PathText";

function GlobalPath({ path }: { path: DotoriPathTypes }) {
  const pathName = getGlobalPagePath(path);

  if (!pathName) return null;

  return <PathText pathType="global">{pathName}</PathText>;
}

export default GlobalPath;
