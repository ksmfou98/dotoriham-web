import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";

export default function useSearchDotoriListService() {
  const location = useLocation();

  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string };
    return parsed;
  }, [location.search]);

  console.log(query);
}
