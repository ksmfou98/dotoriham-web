import PagePath from "components/common/PagePath";
import DotoriTemplate from "components/dotori/DotoriTemplate";
import Reminder from "components/reminder";
import React from "react";

function DotoriPage() {
  return (
    <>
      <Reminder />
      <PagePath />
      <DotoriTemplate />
    </>
  );
}

export default DotoriPage;
