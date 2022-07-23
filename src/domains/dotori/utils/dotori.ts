import { DOTORI_PAGE_SIZE } from "domains/dotori/utils/constants";
import { DotoriPathTypes } from "types/dotori";

// @Note 페이지에 노출 될 도토리 개수
export function getDotoriPageSize(path: DotoriPathTypes) {
  switch (path) {
    case "main":
      return DOTORI_PAGE_SIZE.main;
    case "folder":
      return DOTORI_PAGE_SIZE.folder;
    case "trash":
      return DOTORI_PAGE_SIZE.trash;
    case "search":
      return DOTORI_PAGE_SIZE.search;
  }
}

// @Note 글로벌 page path 정보
export function getGlobalPagePath(path: DotoriPathTypes) {
  switch (path) {
    case "main":
      return "모든 도토리";
    case "trash":
      return "휴지통";
    default:
      return undefined;
  }
}

// @Note page path 에 따른 빈 slate text
export function getBlankSlateText(path: DotoriPathTypes) {
  switch (path) {
    case "search":
      return "찾으시는 도토리가 없어요!";
    case "trash":
      return "휴지통이 비어있어요!";
    default:
      return "아직 저장한 도토리가 없어요!";
  }
}
