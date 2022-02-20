import React, { useEffect } from "react";
import DotoriNav from "components/dotori/DotoriNav";
import DotoriList from "./DotoriList";
import DotoriPagination from "./DotoriPagination";
import useDotoriQuery, {
  DotoriPathTypes,
} from "components/dotori/hooks/useDotoriQuery";
import { useDispatch } from "react-redux";
import { setDotoris } from "stores/dotori";
import { ItemId } from "@atlaskit/tree";

// TODO: Props로 trash인지 serach인지 폴더id 인지 받아와야 함

interface DotoriTemplateProps {
  path: DotoriPathTypes;
  keyword?: string;
  folderId?: ItemId;
}

function DotoriTemplate({ path, keyword, folderId }: DotoriTemplateProps) {
  const { data, isError, isFetching } = useDotoriQuery(
    path,
    0,
    12,
    "saveTime,desc",
    true,
    keyword,
    folderId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;
    dispatch(
      setDotoris(data.content.map((dotori) => ({ ...dotori, checked: false })))
    );
  }, [data, dispatch]);

  if (isFetching) return <div> ...loading</div>;
  if (isError) return <div>컨텐츠가 존재하지 않습니다.</div>;

  return (
    <div>
      <DotoriNav />
      <DotoriList />
      <DotoriPagination />
    </div>
  );
}

export default DotoriTemplate;
