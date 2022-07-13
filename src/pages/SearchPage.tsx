import DotoriTemplate from "modules/dotori/components/DotoriTemplate";
import React, { useMemo } from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const location = useLocation();

  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string };
    return parsed;
  }, [location.search]);

  return <DotoriTemplate path="search" keyword={query.q} />;
}

export default SearchPage;
