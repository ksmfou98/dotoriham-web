import { ArrowLeft16Icon, ArrowSide16Icon } from "assets/icons";
import { palette } from "lib/styles/palette";
import React, { memo } from "react";
import PaginationComponent from "react-js-pagination";
import styled from "styled-components";

interface DotoriPaginationProps {
  page: number;
  onChangePage: (page: number) => void;
  totalElements: number;
  pageSize: number;
}

function DotoriPagination({
  page,
  pageSize,
  onChangePage,
  totalElements,
}: DotoriPaginationProps) {
  return (
    <PaginationBlock>
      <PaginationComponent
        activePage={page} // 현재 페이지
        itemsCountPerPage={pageSize} // 한 페이지당 보여줄 리스트 아이템의 개수
        totalItemsCount={totalElements} // 총 북마크의 개수
        pageRangeDisplayed={5} // Paginator 내에서 보여줄 페이지의 범위
        prevPageText={<ArrowLeft16Icon />}
        nextPageText={<ArrowSide16Icon />}
        onChange={onChangePage} // 페이지가 바뀔 때 핸들링해줄 함수
        hideFirstLastPages
      />
    </PaginationBlock>
  );
}

const PaginationBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 71px;
  // 라이브러리 css 커스텀
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: ${palette.gray};
    font-size: 10px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ul.pagination li.active a {
    color: ${palette.black};
  }
`;

export default memo(DotoriPagination);
