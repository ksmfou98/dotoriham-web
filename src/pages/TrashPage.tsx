import PagePath from "modules/pagePath/PagePath";
import DotoriTemplate from "modules/dotori/DotoriTemplate";
import React from "react";

function TrashPage() {
  return (
    <>
      <PagePath path="trash" />
      <DotoriTemplate path="trash" />
    </>
  );
}

export default TrashPage;
