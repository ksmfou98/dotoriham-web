import React from "react";
import DotoriNav from "components/dotori/DotoriNav";
import DotoriList from "./DotoriList";
import DotoriPagination from "./DotoriPagination";

// TODO: Props로 trash인지 serach인지 폴더id 인지 받아와야 함

function DotoriTemplate() {
  return (
    <div>
      <DotoriNav />
      <DotoriList />
      <DotoriPagination />
    </div>
  );
}

export default DotoriTemplate;
