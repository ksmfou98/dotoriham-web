import PagePath from "components/common/PagePath";
import DotoriTemplate from "components/dotori/DotoriTemplate";
import Reminder from "components/reminder";
import React from "react";
import { useParams } from "react-router-dom";

function DotoriPage() {
  const { folderId } = useParams();
  const folder = folderId || "main";

  console.log(folder);

  return (
    <>
      <Reminder />
      <PagePath />
      <DotoriTemplate />
    </>
  );
}

export default DotoriPage;
