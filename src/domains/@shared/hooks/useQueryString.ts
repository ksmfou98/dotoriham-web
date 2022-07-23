import qs from "qs";
import { useLocation } from "react-router-dom";

type QueryValueType = string | string[];
export type QueryString = Record<string, QueryValueType>;

export default function useQueryString<T = QueryString>(): Partial<T> {
  const { search } = useLocation();

  return qs.parse(search, { ignoreQueryPrefix: true }) as Partial<T>;
}
