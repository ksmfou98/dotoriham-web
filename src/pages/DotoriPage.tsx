import PagePath from "components/common/PagePath";
import DotoriTemplate from "components/dotori/DotoriTemplate";
import Reminder from "components/reminder";
import React from "react";
import { useParams } from "react-router-dom";

function DotoriPage() {
  const { folderId } = useParams();
  const path = folderId ? "folder" : "main";
  return (
    <>
      <Reminder />
      <PagePath />
      <DotoriTemplate path={path} folderId={folderId} />
    </>
  );
}

export default DotoriPage;
