import React, { useEffect, useState } from "react";
import DotoriList from "./DotoriList";
import DotoriPagination from "./DotoriPagination";
import useDotoriQuery from "components/dotori/hooks/useDotoriQuery";
import { useDispatch } from "react-redux";
import { setDotoris } from "stores/dotori";
import { ItemId } from "@atlaskit/tree";
import useToggle from "hooks/useToggle";
import { DotoriPathTypes, FilterMenu } from "types/dotori";
import styled from "styled-components";
import { palette } from "lib/styles/palette";
import DotoriSelectNav from "./DotoriSelectNav";
import DotoriFilterNav from "./DotoriFilterNav";
import { getDotoriPageSize } from "lib/utils/dotori";

// TODO: Props로 trash인지 serach인지 폴더id 인지 받아와야 함

interface DotoriTemplateProps {
  path: DotoriPathTypes;
  keyword?: string;
  folderId?: ItemId;
}

function DotoriTemplate({ path, keyword, folderId }: DotoriTemplateProps) {
  const [isRemind, onToggleRemind] = useToggle(false);
  const [page, setPage] = useState(1);
  const [isOpenFilterMenu, onToggleFilterMenu] = useToggle(false);
  const [filterType, setFilterType] = useState<FilterMenu>({
    text: "최신순",
    label: "saveTime,desc",
  });

  const pageSize = getDotoriPageSize(path);

  const onChangeFilterType = (filterType: FilterMenu) => {
    setFilterType(filterType);
  };

  const onChangePage = (page: number) => setPage(page);

  const { data } = useDotoriQuery(
    path,
    page - 1,
    pageSize,
    filterType.label,
    isRemind,
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

  if (!data) return null;

  return (
    <>
      <DotoriNavBlock>
        <DotoriSelectNav />
        <DotoriFilterNav
          isRemind={isRemind}
          onToggleRemind={onToggleRemind}
          isOpenFilterMenu={isOpenFilterMenu}
          onToggleFilterMenu={onToggleFilterMenu}
          filterType={filterType}
          onChangeFilterType={onChangeFilterType}
        />
      </DotoriNavBlock>
      <DotoriList path={path} />
      <DotoriPagination
        page={page}
        onChangePage={onChangePage}
        totalElements={data.totalElements}
        pageSize={pageSize}
      />
    </>
  );
}

const DotoriNavBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 28px;
  font-size: 12px;
  color: ${palette.grayDarkest};
`;

export default DotoriTemplate;
