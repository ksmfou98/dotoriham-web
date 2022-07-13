import React from "react";
import PagePath from "modules/pagePath/PagePath";
import DotoriTemplate from "modules/dotori/components/DotoriTemplate";
import Reminder from "modules/reminder";
import { useLocation, useParams } from "react-router-dom";
import Path from "routes/Path";
import ChildFolders from "modules/childFolder";

function DotoriPage() {
  const { folderId } = useParams();
  const location = useLocation();
  const path = folderId ? "folder" : "main";

  return (
    <>
      {location.pathname === Path.DotoriPage && <Reminder />}
      <PagePath path={path} folderId={folderId} />
      {path === "folder" && folderId && <ChildFolders folderId={folderId} />}
      <DotoriTemplate path={path} folderId={folderId} />
    </>
  );
}

export default DotoriPage;
