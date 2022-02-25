import { DotoriPathTypes } from "types/dotori";

export default function getGlobalPagePath(path: DotoriPathTypes) {
  switch (path) {
    case "main":
      return "모든 도토리";
    case "trash":
      return "휴지통";
    default:
      return undefined;
  }
}
