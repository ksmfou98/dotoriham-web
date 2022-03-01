import { DOTORI_PAGE_SIZE } from "components/dotori/constants";
import { DotoriPathTypes } from "types/dotori";

export default function getDotoriPageSize(path: DotoriPathTypes) {
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
