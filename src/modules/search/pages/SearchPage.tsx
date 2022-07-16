import DotoriTemplate from "modules/dotori/components/DotoriTemplate";
import React, { useMemo } from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";
import SearchDotoriListContainer from "../containers/SearchDotoriListContainer";

function SearchPage() {
  const location = useLocation();

  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string };
    return parsed;
  }, [location.search]);

  return (
    <>
      <DotoriTemplate path="search" keyword={query.q} />;
      <SearchDotoriListContainer />
    </>
  );
}

export default SearchPage;
