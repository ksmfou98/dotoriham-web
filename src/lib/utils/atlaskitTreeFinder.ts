import { ItemId, TreeData } from "@atlaskit/tree";

// id로 children length 구하기
export const findChildrenLengthById = (folders: TreeData, itemId: ItemId) => {
  return folders.items[itemId].children.length;
};

// id로 parent id 구하기
export const findParentIdById = (folders: TreeData, itemId: ItemId) => {
  const folderItems = Object.keys(folders.items);
  for (let item = 0; item < folderItems.length; item++) {
    if (folders.items[folderItems[item]].children.includes(itemId)) {
      return folderItems[item];
    }
  }
  return null;
};

// 해당 폴더가 최상위 폴더인지 구하기
export const isRootFolder = (folders: TreeData, itemId: ItemId) => {
  return folders.items.root.children.includes(itemId);
};
