import { DotoriPathTypes } from "types/dotori";

export default function getDotoriPageSize(path: DotoriPathTypes) {
  switch (path) {
    case "main":
      return 9;
    case "folder":
      return 9;
    case "trash":
      return 12;
    case "search":
      return 12;
  }
}
