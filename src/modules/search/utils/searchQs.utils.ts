import qs from "qs";

const searchKeys = ["keyword", "page", "remind", "size", "sort"];
const searchKeysSet = new Set(searchKeys);

interface Props {
  [key: string]: string;
}

export const mergeQsParserWithSearchKeys = (search: Props) => {
  const preserveParams = Object.entries(
    qs.parse(window.location.search, { ignoreQueryPrefix: true })
  ).reduce((prev, [key, value]) => {
    /**
     * searchKeys가 존재하면 쿼리 파라미터를 그대로 가지고 이동
     */

    if (searchKeysSet.has(key) && value) {
      prev[key] = value.toString();
    }
    return prev;
  }, {} as Record<string, string>);
  return qs.stringify({ ...preserveParams, ...search });
};
