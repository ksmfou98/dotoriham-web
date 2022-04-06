import React, { useEffect, useState } from "react";
import DotoriList from "./DotoriList";
import DotoriPagination from "./DotoriPagination";
import useDotoriQuery from "components/dotori/hooks/useDotoriQuery";
import { useDispatch, useSelector } from "react-redux";
import { dotoriSelector, setDotoris } from "stores/dotori";
import { ItemId } from "@atlaskit/tree";
import useToggle from "hooks/useToggle";
import { DotoriPathTypes, FilterMenu } from "types/dotori";
import styled from "styled-components";
import { palette } from "lib/styles/palette";
import DotoriSelectNav from "./DotoriSelectNav";
import DotoriFilterNav from "./DotoriFilterNav";
import { getDotoriPageSize } from "lib/utils/dotori";
import SmallModal from "components/common/SmallModal";
import FolderListModal from "components/common/FolderListModal";
import useDotoriMutation from "./hooks/useDotoriMutation";

// TODO: Props로 trash인지 serach인지 폴더id 인지 받아와야 함

interface DotoriTemplateProps {
  path: DotoriPathTypes;
  keyword?: string;
  folderId?: ItemId;
}

export interface DotoriToggleModals {
  onToggleDeleteModal: () => void;
  onToggleMoveModal: () => void;
  onToggleRestoreModal: () => void;
  onToggleTruncateModal: () => void;
}

function DotoriTemplate({ path, keyword, folderId }: DotoriTemplateProps) {
  const dotoris = useSelector(dotoriSelector);
  const dispatch = useDispatch();

  const { mutateMoveDotori } = useDotoriMutation();

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

  const onToggleModal: DotoriToggleModals = {
    onToggleDeleteModal,
    onToggleMoveModal,
    onToggleRestoreModal,
    onToggleTruncateModal,
  };

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

  useEffect(() => {
    if (!data) return;
    dispatch(
      setDotoris(data.content.map((dotori) => ({ ...dotori, checked: false })))
    );
  }, [data, dispatch]);

  const onMoveDotori = (nextFolderId: ItemId) => {
    const checkedDotoris = dotoris
      .filter((dotori) => dotori.checked)
      .map((dotori) => dotori.id);
    if (checkedDotoris.length === 0) return;
    mutateMoveDotori({ bookmarkIdList: checkedDotoris, nextFolderId });
  };

  if (!data) return null;
  return (
    <>
      <DotoriNavBlock>
        <DotoriSelectNav
          onToggleModal={onToggleModal}
          isTrashPage={path === "trash"}
        />
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

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="선택한 도토리를 삭제할까요?"
          content="삭제된 도토리는 모두 <br /> 휴지통으로 들어가요!"
          buttonName="삭제"
          onClick={() => console.log("삭제")}
        />
      )}

      {isMoveModal && (
        <FolderListModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
          onMove={onMoveDotori}
          path={path}
        />
      )}

      {isRestoreModal && (
        <SmallModal
          isModal={isRestoreModal}
          onToggleModal={onToggleRestoreModal}
          title="선택한 도토리를 원래 위치로 복원할까요?"
          content="기존 보관 위치가 삭제된 도토리는 <br /> '모든 도토리'에서 확인할 수 있어요!"
          buttonName="복원"
          onClick={() => console.log("복원")}
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
          onClick={() => console.log("영구 삭제")}
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
