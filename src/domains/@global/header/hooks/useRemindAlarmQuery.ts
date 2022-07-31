import { getRemindAlarmListAPI } from "lib/api/remind";
import { ReactQueryKey } from "lib/queryKey";
import { useQuery } from "react-query";

export default function useRemindAlarmQuery() {
  const query = useQuery(
    ReactQueryKey.remindAlarmList(),
    () => getRemindAlarmListAPI(),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );

  return query;
}
