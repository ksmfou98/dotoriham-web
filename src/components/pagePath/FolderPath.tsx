import { ArrowSide16Icon } from "assets/icons";
import InviteTopBar from "components/inviteTopBar/InviteTopBar";
import { isRootFolder } from "lib/utils/atlaskitTreeFinder";
import React from "react";
import { useSelector } from "react-redux";
import { folderSelector } from "stores/folder";
import styled from "styled-components";
import FolderEmojiAndName from "./FolderEmojiAndName";
import FolderPathEllipsis from "./FolderPathEllipsis";
import usePagePathQuery from "./hooks/usePagePathQuery";

interface FolderPathProps {
  folderId: string;
  isModal?: boolean;
}

function FolderPath({ folderId, isModal }: FolderPathProps) {
  const { data } = usePagePathQuery(folderId);
  const folders = useSelector(folderSelector);
  if (!data) return null;

  const FIRST_FOLDER_INFO = data[0];
  const LAST_FOLDER_INFO = data[data.length - 1];
  const LAST_FOLDER_INDEX = data.length - 1;

  return (
    <FolderPathStyled>
      {data.length <= 2 ? (
        <Container>
          {data.map((item, index) => (
            <React.Fragment key={item.folderId}>
              <FolderEmojiAndName folderInfo={item} />
              {LAST_FOLDER_INDEX !== index && <ArrowSide16Icon />}
            </React.Fragment>
          ))}
        </Container>
      ) : (
        <Container>
          <FolderEmojiAndName folderInfo={FIRST_FOLDER_INFO} />
          <ArrowSide16Icon />

          <FolderPathEllipsis folderPathList={data} />

          <ArrowSide16Icon />
          <FolderEmojiAndName folderInfo={LAST_FOLDER_INFO} />
        </Container>
      )}

      {folders.rootId === "root" &&
        isRootFolder(folders, Number(folderId)) &&
        !isModal && <InviteTopBar />}
    </FolderPathStyled>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const FolderPathStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default FolderPath;
