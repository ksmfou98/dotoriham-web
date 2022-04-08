import { ArrowSide16Icon } from "assets/icons";
import React from "react";
import styled from "styled-components";
import FolderEmojiAndName from "./FolderEmojiAndName";
import FolderPathEllipsis from "./FolderPathEllipsis";
import usePagePathQuery from "./hooks/usePagePathQuery";

interface FolderPathProps {
  folderId: string;
}

function FolderPath({ folderId }: FolderPathProps) {
  const { data } = usePagePathQuery(folderId);
  if (!data) return null;

  const FIRST_FOLDER_INFO = data[0];
  const LAST_FOLDER_INFO = data[data.length - 1];
  const LAST_FOLDER_INDEX = data.length - 1;

  return (
    <FolderPathStyled>
      {data.length <= 2 ? (
        <>
          {data.map((item, index) => (
            <React.Fragment key={item.folderId}>
              <FolderEmojiAndName folderInfo={item} />
              {LAST_FOLDER_INDEX !== index && <ArrowSide16Icon />}
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          <FolderEmojiAndName folderInfo={FIRST_FOLDER_INFO} />
          <ArrowSide16Icon />

          <FolderPathEllipsis folderPathList={data} />

          <ArrowSide16Icon />
          <FolderEmojiAndName folderInfo={LAST_FOLDER_INFO} />
        </>
      )}
    </FolderPathStyled>
  );
}

const FolderPathStyled = styled.div`
  display: flex;
`;

export default FolderPath;
