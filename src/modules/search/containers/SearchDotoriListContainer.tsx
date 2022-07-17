import { SmallModal } from "components";
import { palette } from "lib/styles";
import { useToggle } from "modules/@shared/hooks";
import FolderListModal from "modules/sidebar/FolderListModal";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  SearchDotoriList,
  SearchDotoriSelect,
  SearchDotoriSort,
} from "../components";
import { DotoriUiModel, toDotoriUiModel } from "../models/dotori.model";
import { useSearchDotoriListService } from "../services";

function SearchDotoriListContainer() {
  const { data } = useSearchDotoriListService();
  const [dotoriList, setDotoriList] = useState<DotoriUiModel[]>([]);

  const [isDeleteModal, onToggleDeleteModal] = useToggle();
  const [isMoveModal, onToggleMoveModal] = useToggle();

  useEffect(() => {
    if (!data) return;
    setDotoriList(toDotoriUiModel(data.content));
  }, [data]);

  const isDotoriAllChecked = useMemo(
    () => dotoriList.every((dotori) => dotori.checked),
    [dotoriList]
  );

  const isDotoriChecked = useMemo(() => {
    return dotoriList.some((dotori) => dotori.checked);
  }, [dotoriList]);

  const onToggleDotoriAllChecked = () => {
    setDotoriList(
      dotoriList.map((dotori) => ({
        ...dotori,
        checked: !isDotoriAllChecked,
      }))
    );
  };

  const onToggleDotoriChecked = (dotoriId: string) => {
    setDotoriList(
      dotoriList.map((dotori) =>
        dotori.id === dotoriId
          ? { ...dotori, checked: !dotori.checked }
          : dotori
      )
    );
  };

  return (
    <>
      <Navigation>
        <SearchDotoriSelect
          isActiveSelectBox={isDotoriChecked}
          onToggleDotoriAllChecked={onToggleDotoriAllChecked}
          isDotoriAllChecked={isDotoriAllChecked}
        />
        <SearchDotoriSort />
      </Navigation>

      <SearchDotoriList dotoriList={dotoriList} />

      {isDeleteModal && (
        <SmallModal
          isModal={isDeleteModal}
          onToggleModal={onToggleDeleteModal}
          title="선택한 도토리를 삭제할까요?"
          content="삭제된 도토리는 모두 <br /> 휴지통으로 들어가요!"
          buttonName="삭제"
          onClick={() => console.log("delete")}
        />
      )}

      {isMoveModal && (
        <FolderListModal
          isModal={isMoveModal}
          onToggleModal={onToggleMoveModal}
          onMove={() => console.log("move")}
          path="search"
        />
      )}
    </>
  );
}

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 28px;
  font-size: 12px;
  color: ${palette.grayDarkest};
`;

export default SearchDotoriListContainer;
