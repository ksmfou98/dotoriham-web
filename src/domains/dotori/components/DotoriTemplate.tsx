import React, { useCallback, useEffect, useMemo, useState } from "react";
import DotoriList from "./DotoriList";
import DotoriPagination from "./DotoriPagination";
import useDotoriQuery from "domains/dotori/hooks/useDotoriQuery";
import { useDispatch, useSelector } from "react-redux";
import { dotoriSelector, setDotoris } from "stores/dotori";
import { ItemId } from "@atlaskit/tree";
import useToggle from "domains/@shared/hooks/useToggle";
import { DotoriPathTypes, FilterMenu } from "types/dotori";
import styled from "styled-components";
import { palette } from "lib/styles/palette";
import DotoriSelectNav from "./DotoriSelectNav";
import DotoriFilterNav from "./DotoriFilterNav";
import { getDotoriPageSize } from "domains/dotori/utils/dotori";
import SmallModal from "components/Modal/SmallModal";
import FolderListModal from "domains/@global/sidebar/FolderListModal";
import useDotoriMutation from "../hooks/useDotoriMutation";
import { useNavigate } from "react-router-dom";
import Path from "routes/Path";

interface DotoriTemplateProps {
  path: DotoriPathTypes;
  keyword?: string;
  folderId?: ItemId;
}

function DotoriTemplate({ path, keyword, folderId }: DotoriTemplateProps) {
  const dotoris = useSelector(dotoriSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mutateMoveDotori,
    mutateDeleteDotori,
    mutateRestoreDotori,
    mutateTruncateDotori,
  } = useDotoriMutation();

  const [isRemind, onToggleRemind] = useToggle();
  const [page, setPage] = useState(1);
  const [isOpenFilterMenu, onToggleFilterMenu] = useToggle();
  const [filterType, setFilterType] = useState<FilterMenu>({
    text: "최신순",
    label: "saveTime,desc",
  });

  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();
  const [isRestoreModal, onToggleRestoreModal] = useToggle();
  const [isTruncateModal, onToggleTruncateModal] = useToggle();

  const pageSize = getDotoriPageSize(path);

  const onChangeFilterType = useCallback((filterType: FilterMenu) => {
    setFilterType(filterType);
  }, []);

  const onChangePage = useCallback((page: number) => setPage(page), []);

  const { data, error } = useDotoriQuery(
    path,
    page - 1,
    pageSize,
    filterType.label,
    isRemind,
    keyword,
    folderId
  );

  useEffect(() => {
    if (error instanceof Error) {
      if (error.message === "개체가 존재하지 않습니다") {
        navigate(Path.DotoriPage);
      }
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!data) return;
    dispatch(
      setDotoris(data.content.map((dotori) => ({ ...dotori, checked: false })))
    );
  }, [data, dispatch]);

  const checkedDotoris = useMemo(
    () => dotoris.filter((dotori) => dotori.checked).map((dotori) => dotori.id),
    [dotoris]
  );

  const onMoveDotori = (nextFolderId: ItemId) => {
    if (checkedDotoris.length === 0) return;
    mutateMoveDotori({ bookmarkIdList: checkedDotoris, nextFolderId });
  };

  const onDeleteDotori = () => {
    if (checkedDotoris.length === 0) return;
    mutateDeleteDotori(checkedDotoris);
  };

  const onRestoreDotori = () => {
    if (checkedDotoris.length === 0) return;
    mutateRestoreDotori(checkedDotoris);
  };

  const onTruncateDotori = () => {
    if (checkedDotoris.length === 0) return;
    mutateTruncateDotori(checkedDotoris);
  };

  return (
    <>
      <DotoriNavBlock>
        <DotoriSelectNav
          isTrashPage={path === "trash"}
          onToggleDeleteModal={onToggleDeleteModal}
          onToggleMoveModal={onToggleMoveModal}
          onToggleTruncateModal={onToggleTruncateModal}
          onToggleRestoreModal={onToggleRestoreModal}
        />

        {path !== "trash" && (
          <DotoriFilterNav
            isRemind={isRemind}
            onToggleRemind={onToggleRemind}
            isOpenFilterMenu={isOpenFilterMenu}
            onToggleFilterMenu={onToggleFilterMenu}
            filterType={filterType}
            onChangeFilterType={onChangeFilterType}
          />
        )}
      </DotoriNavBlock>

      <DotoriList path={path} />

      {data && data.totalElements > getDotoriPageSize(path) && (
        <DotoriPagination
          page={page}
          onChangePage={onChangePage}
          totalElements={data.totalElements}
          pageSize={pageSize}
        />
      )}

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="선택한 도토리를 삭제할까요?"
          content="휴지통의 도토리는 <br /> 30일 뒤 완전히 사라져요!"
          buttonName="삭제"
          onClick={onDeleteDotori}
        />
      )}

      {isMoveModal && (
        <FolderListModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
          onMove={onMoveDotori}
        />
      )}

      {isRestoreModal && (
        <SmallModal
          isModal={isRestoreModal}
          onToggleModal={onToggleRestoreModal}
          title="선택한 도토리를 원래 위치로 복원할까요?"
          content="기존 보관 위치가 삭제된 도토리는 <br /> '모든 도토리'에서 확인할 수 있어요!"
          buttonName="복원"
          onClick={onRestoreDotori}
        />
      )}

      {isTruncateModal && (
        <SmallModal
          isModal={isTruncateModal}
          onToggleModal={onToggleTruncateModal}
          title="선택한 도토리를 삭제할까요?"
          content="삭제된 도토리는 완전히 사라져요!"
          buttonName="삭제"
          isOneLine
          onClick={onTruncateDotori}
        />
      )}
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
