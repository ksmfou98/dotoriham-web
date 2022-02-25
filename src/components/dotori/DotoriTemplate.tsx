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

// TODO: Props로 trash인지 serach인지 폴더id 인지 받아와야 함

interface DotoriTemplateProps {
  path: DotoriPathTypes;
  keyword?: string;
  folderId?: ItemId;
}

function DotoriTemplate({ path, keyword, folderId }: DotoriTemplateProps) {
  const [isRemind, onToggleRemind] = useToggle(false);
  const [isOpenFilterMenu, onToggleFilterMenu] = useToggle(false);
  const [filterType, setFilterType] = useState<FilterMenu>({
    text: "최신순",
    label: "saveTime,desc",
  });

  const onChangeFilterType = (filterType: FilterMenu) => {
    setFilterType(filterType);
  };

  const { data } = useDotoriQuery(
    path,
    0,
    12,
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
      <DotoriPagination />
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
