import { ItemId, mutateTree } from "@atlaskit/tree";
import { updateFolderAPI } from "lib/api/folder";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { EmojiObject } from "react-twemoji-picker";
import { folderSelector, setFolders } from "stores/folder";

export default function useRenameFolder(folderId: ItemId) {
  const folders = useSelector(folderSelector);
  const dispatch = useDispatch();
  const { name, emoji } = folders.items[folderId].data;

  const [newFolderName, setNewFolderName] = useState(name);
  const [newFolderEmoji, setNewFolderEmoji] = useState<EmojiObject>({
    unicode: emoji,
    name: "emoji",
  });

  const onChangeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const onChangeFolderEmoji = (emoji: EmojiObject) => {
    setNewFolderEmoji(emoji);
  };

  const { mutate: mutateRenameFolder } = useMutation(
    () => updateFolderAPI(folderId, newFolderName, newFolderEmoji.unicode),
    {
      onSuccess: () => {
        dispatch(
          setFolders(
            mutateTree(folders, folderId, {
              data: {
                name: newFolderName,
                emoji: newFolderEmoji.unicode,
              },
            })
          )
        );
      },
      onError: () => {
        alert("폴더 이름 변경에 실패했습니다. 잠시 후 다시 시도해 주세요");
      },
    }
  );

  return {
    newFolderName,
    newFolderEmoji,
    onChangeFolderName,
    onChangeFolderEmoji,
    mutateRenameFolder,
  };
}
