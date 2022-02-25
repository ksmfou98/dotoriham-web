import { DotoriPathTypes } from "types/dotori";

// trash or search or folder or main
export default function getBlankSlateText(path: DotoriPathTypes) {
  switch (path) {
    case "search":
      return "찾으시는 도토리가 없어요!";
    case "trash":
      return "휴지통이 비어있어요!";
    default:
      return "아직 저장한 도토리가 없어요!";
  }
}
