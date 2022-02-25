import PagePath from "components/pagePath/PagePath";
import DotoriTemplate from "components/dotori/DotoriTemplate";
import Reminder from "components/reminder";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Path from "routes/Path";

function DotoriPage() {
  const { folderId } = useParams();
  const location = useLocation();
  const path = folderId ? "folder" : "main";

  return (
    <>
      {location.pathname === Path.DotoriPage && <Reminder />}
      <PagePath />
      <DotoriTemplate path={path} folderId={folderId} />
    </>
  );
}

export default DotoriPage;
