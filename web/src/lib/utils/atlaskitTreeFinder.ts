import { ItemId, TreeData } from "@atlaskit/tree";

// id로 children length 구하기
export const findChildrenLengthById = (folders: TreeData, itemId: ItemId) => {
  return folders.items[itemId].children.length;
};
