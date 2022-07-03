import { getRemindListAPI } from "lib/api/remind";
import { ReactQueryKey } from "lib/queryKey";
import { useQuery } from "react-query";

export default function useRemindQuery() {
  const query = useQuery(ReactQueryKey.remindList(), () => getRemindListAPI(), {
    cacheTime: 3 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
  });
  return query;
}
