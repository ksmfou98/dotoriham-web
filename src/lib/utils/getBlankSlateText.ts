import { DotoriPathTypes } from "components/dotori/hooks/useDotoriQuery";

// trash or search or folder or main
const getBlankSlateText = (path: DotoriPathTypes) => {
  switch (path) {
    case "search":
      return "찾으시는 도토리가 없어요!";
    case "trash":
      return "휴지통이 비어있어요!";
    case "folder":
      return "아직 저장한 도토리가 없어요!";
    default:
      return "아직 저장한 도토리가 없어요!";
  }
};

export default getBlankSlateText;
